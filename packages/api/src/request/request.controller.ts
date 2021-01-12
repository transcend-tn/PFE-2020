import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { RequestService } from './request.service';
import { RequestCreate } from '@tr/common';

@Controller('request')
@UseGuards(AuthGuard())
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post(':id')
  createRequest(
    @GetUser() currentUser: User,
    @Param('id') id: string,
    @Body() newRequest: RequestCreate,
  ) {
    return this.requestService.createRequest(currentUser, id, newRequest);
  }

  @Get(':id')
  getRequest(@Param('id') id: string) {
    return this.requestService.getRequest(id);
  }

  @Get('/detail/:id')
  getRequestDetail(@Param('id') id: string) {
    return this.requestService.getRequestDetail(id);
  }
}
