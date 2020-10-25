import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreate, UserLogin } from '@tr/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

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
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(newUser.password, newUser.salt);
    newUser.img = 'user.png';

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
      return { username: user.username, email: user.email };
    } else {
      return null;
    }
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
