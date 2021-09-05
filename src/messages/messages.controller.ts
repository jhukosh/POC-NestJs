import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

  constructor(private messageService: MessagesService) { }

  @Get()
  getAllMessages() {
      return this.messageService.getAllMessages();
  }

  @Get('user/:userId')
  getUserMessages(@Param() params) {
      return this.messageService.getUserMessages(params.userId);
  }

  @Get(':messageId')
  getOneById(@Param() params) {
      return this.messageService.getOneById(params.messageId);
  }

  @Post('user/:userId')
  create(
    @Param() params,
    @Body() message: Message
  ) {
      return this.messageService.createMessage(params.userId, message);
  }

  @Put(':messageId/user/:userId')
  updateMessageContent(
    @Param() params,
    @Body() message: Message
  ): Promise<Message> {
    return this.messageService.updateContent(params.messageId, params.userId, message);
  }

  @Put(':messageId/user/:userId/read')
  markAsRead(
    @Param() params
  ): Promise<Message> {
    return this.messageService.markAsRead(params.messageId, params.userId);
  }

  @Delete(':messageId/user/:userId')
  deleteMessage(
    @Param() params
  ): boolean {
    return !!this.messageService.deleteMessage(params.messageId, params.userId);
  }
}
