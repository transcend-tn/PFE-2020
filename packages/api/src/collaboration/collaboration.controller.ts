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
@UseGuards(AuthGuard())
export class CollaborationController {
  constructor(private collaborationService: CollaborationService) {}

  @Post(':id')
  joinTeam(@GetUser() currentUser: User, @Param('id') id: string, isOwner:boolean=false) {
    return this.collaborationService.joinTeam(currentUser, id, isOwner);
  }

  @Get(':id')
  collaborationTeam(@Param('id') id: string) {
    return this.collaborationService.collaborationTeam(id);
  }

  @Delete(':id')
  leaveTeam(@GetUser() currentUser: User, @Param('id') id: string) {
    return this.collaborationService.leaveTeam(currentUser, id);
  }

  @Put('enable/:idc/:idu')
  enable(@GetUser() currentUser: User, @Param('idc') idc:string, @Param('idu') idu:string)
  {
    return this.collaborationService.enable(currentUser, idu, idc);
  }

  @Put('disable/:idc/:idu')
  disable(@GetUser() currentUser: User, @Param('idc') idc:string, @Param('idu') idu:string)
  {
    return this.collaborationService.disable(currentUser, idu, idc);
  }

  @Delete('remove/:idc/:idu')
  remove(@GetUser() currentUser: User, @Param('idc') idc:string, @Param('idu') idu:string)
  {
    return this.collaborationService.remove(currentUser, idu, idc);
  }
}
