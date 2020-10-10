import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

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
}
