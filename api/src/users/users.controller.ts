import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUser } from './get-user.decorator';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get()
  @UseGuards(AuthGuard())
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.usersService.signIn(authCredentialsDto);
  }
}
