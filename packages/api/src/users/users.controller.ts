import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreate, UserLogin } from '@tr/common';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

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
  createUser(@Body() user: UserCreate) {
    return this.usersService.createUser(user);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: UserLogin) {
    return this.usersService.signIn(authCredentialsDto);
  }
}
