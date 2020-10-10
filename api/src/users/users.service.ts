import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        const newUser = this.userRepository.create(user);
        
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
}
