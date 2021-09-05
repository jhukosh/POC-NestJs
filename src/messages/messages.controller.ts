import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

  constructor(private service: MessagesService) { }

  @Get()
  get(@Param() params) {
      return this.service.getAllMessages();
  }

  @Get(':id')
  getUserMessages(@Param() params) {
      return this.service.getUserMessages(params.id);
  }

  @Post(':id')
  create(
    @Param() params,
    @Body() message: Message
  ) {
      return this.service.createMessage(params.id, message);
  }

}
