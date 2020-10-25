import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreate, UserLogin, UserEdit } from '@tr/common';
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

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put()
  @UseGuards(AuthGuard())
  editUser(@Body() data: UserEdit, @GetUser() user: User) {
    return this.usersService.editUser(data, user);
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
