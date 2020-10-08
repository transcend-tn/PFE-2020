import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

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
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
    }
}
