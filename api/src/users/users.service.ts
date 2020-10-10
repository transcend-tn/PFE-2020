import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) 
    private userRepository: UserRepository,
    private jwtService: JwtService,) 
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
        const payload = await this.validateUserPassword(authCredentialsDto);
    
        if (!payload) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const accessToken = await this.jwtService.sign(payload);
       return {accessToken};
    
      }

      async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });
    
        if (user && await user.validatePassword(password)) {
          return {username : user.username, email : user.email};
        } else {
          return null;
        }
      }
}
