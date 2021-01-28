import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreate, UserLogin, UserEdit, UserChangePassword } from '@tr/common';
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

  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Put()
  @UseGuards(AuthGuard())
  editUser(@Body() data: UserEdit, @GetUser() user: User) {
    return this.usersService.editUser(data, user);
  }

  @Put('change-password')
  @UseGuards(AuthGuard())
  async changePassword(@Body() data: UserChangePassword, @GetUser() currentUser: User){
    return this.usersService.changePassword(data, currentUser);
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

  @Delete()
  @UseGuards(AuthGuard())
  softRemove(@GetUser() currentUser:User)
  {
    return this.usersService.softDelete(currentUser.id);
  }

  @Get('restore/:id')
  restore(@Param('id') id:string)
  {return this.usersService.recoverUser(id)}

  @Get('/find/:keyword')
  searchUser(@Param('keyword') keyword: string) {
    return this.usersService.searchUser(keyword);
  }
}
