import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserChangePassword,
  UserCreate,
  UserEdit,
  UserLogin,
} from '@tr/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import {Like} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  async createUser(user: UserCreate) {
    const newUser = this.userRepository.create(user);
    newUser.fname = '';
    newUser.lname = '';
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(newUser.password, newUser.salt);
    newUser.img = '/user.png';

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(authCredentialsDto: UserLogin) {
    const payload = await this.validateUserPassword(authCredentialsDto);

    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUserPassword(authCredentialsDto: UserLogin) {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
      };
    } else {
      return null;
    }
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.id,
      img: user.img,
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
    };
  }
  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({username})
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.id,
      img: user.img,
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
    };
  }

  async editUser(data: UserEdit, currentUser: User) {
    const user = await this.getUserById(currentUser.id);
    user.fname = data.fname;
    user.lname = data.lname;
    user.email = data.email;
    await this.userRepository.save(user);
    return user;
  }

  async changePassword(data: UserChangePassword, currentUser: User) {
    if (await currentUser.validatePassword(data.oldPassword)) {
      if (data.newPassword === data.confirmPassword) {
        currentUser.password = await this.hashPassword(
          data.newPassword,
          currentUser.salt,
        );
        try {
          currentUser.save();
        } catch (error) {
          throw new InternalServerErrorException('Try another time');
        }
      } else {
        throw new ConflictException('Verify newPassword & confirmPassword');
      }
    } else throw new UnauthorizedException('Verify old password');
  }

  async softDelete(id:string)
{
  await this.userRepository.softDelete(id);
}

async recoverUser(id:string)
{
  await this.userRepository.restore(id);
}

async searchUser(keyword: string) {
  const users = await this.userRepository.find({
    where : [
      {username : Like(`%${keyword}%`)},
      {fname : Like(`%${keyword}%`)},
      {lname : Like(`%${keyword}%`)},
    ],
    order: {fname: "ASC"}
  });
  return users;
}
}
