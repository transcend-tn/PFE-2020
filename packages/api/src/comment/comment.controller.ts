import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CommentCreate } from '@tr/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post(':id')
    addComment(@Body() comment:CommentCreate, @GetUser() currentUser:User, @Param('id') id:string)
    {return this.commentService.addComment(comment, currentUser, id);}
}
