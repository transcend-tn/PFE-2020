import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '../users/user.entity';
import { VoteService } from './vote.service';

@Controller('vote')
@UseGuards(AuthGuard())
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post(':id')
  addVote(@Param('id') id: string, @GetUser() currentUser: User) {
    return this.voteService.addVote(id, currentUser);
  }

  @Get(':id')
  voted(@Param('id') id: string, @GetUser() currentUser: User) {
    return this.voteService.voted(id, currentUser);
  }
}
