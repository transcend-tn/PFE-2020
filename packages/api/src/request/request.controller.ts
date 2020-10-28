import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('request')
@UseGuards(AuthGuard())
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post(':id')
  createRequest(@GetUser() currentUser: User, @Param('id') id:string, @Body('body') body: string) {
    return this.requestService.createRequest(currentUser, id, body);
  }
}
