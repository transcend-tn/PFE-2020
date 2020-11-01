import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CollaborationService } from './collaboration.service';

@Controller('collaboration')
export class CollaborationController {
  constructor(private collaborationService: CollaborationService) {}

  @Post(':id')
  @UseGuards(AuthGuard())
  joinTeam(@GetUser() currentUser: User, @Param('id') id: string, isOwner:boolean=false) {
    return this.collaborationService.joinTeam(currentUser, id, isOwner);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  collaborationTeam(@Param('id') id: string) {
    return this.collaborationService.collaborationTeam(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  leaveTeam(@GetUser() currentUser: User, @Param('id') id: string) {
    return this.collaborationService.leaveTeam(currentUser, id);
  }

  @Put('enable/:idc/:idu')
  enable(@Param('idc') idc:string, @Param('idu') idu:string)
  {
    return this.collaborationService.enable(idu,idc);
  }

  @Put('disable/:idc/:idu')
  disable(@Param('idc') idc:string, @Param('idu') idu:string)
  {
    return this.collaborationService.disable(idu,idc);
  }
}
