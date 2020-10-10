import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) 
    {}
    
    async getAllUsers()
    {
        const users = await this.userRepository.find();
        if (!users)
        {throw new NotFoundException();}
        return users;
    }

    async createUser(user: CreateUserDto) {
        const newUser = this.userRepository.create(user);
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await this.hashPassword(newUser.password, newUser.salt);
        
        try
        {
            await this.userRepository.save(newUser);
        }
        catch(error)
        {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
              } else {
                throw new InternalServerErrorException();
              }
        } 
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
      }

      async signIn(authCredentialsDto: AuthCredentialsDto){
        const username = await this.validateUserPassword(authCredentialsDto);
    
        if (!username) {
          throw new UnauthorizedException('Invalid credentials');
        }
       return {username};
    
      }

      async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });
    
        if (user && await user.validatePassword(password)) {
          return user.username;
        } else {
          return null;
        }
      }
}
