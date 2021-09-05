import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) { }

  async getAllMessages(): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  async getUserMessages(userId: number): Promise<Message[]> {
    return await this.messagesRepository.find({
      select: ["content", "sender"],
      where: [{ "receiver": userId }]
  });
  }

  async createMessage(senderId: number, message: Message) {
    message.sender = senderId;
    await this.messagesRepository.save(message);
  }
}
