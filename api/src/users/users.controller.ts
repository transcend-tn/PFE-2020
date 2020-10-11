import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService)
    {}

    @Get()
    getAllUsers()
    {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser( @Body() user:CreateUserDto)
    {
        return this.usersService.createUser(user);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
      return this.usersService.signIn(authCredentialsDto);
    }
}
