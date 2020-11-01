import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CommentCreate } from '@tr/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post('/document/:id')
    documentComment(@Body() comment:CommentCreate, @GetUser() currentUser:User, @Param('id') id:string)
    {return this.commentService.documentComment(comment, currentUser, id);}

    @Get('/document/:id')
    getCommentById(@Param('id') id: string) {
      return this.commentService.getCommentByDocId(id);
    }

    @Post('/request/:id')
    requestComment(@Body() comment:CommentCreate, @GetUser() currentUser:User, @Param('id') id:string)
    {return this.commentService.requestComment(comment, currentUser, id);}

    @Get('/request/:id')
    getCommentByReqId(@Param('id') id: string) {
      return this.commentService.getCommentByReqId(id);
    }

  
}
