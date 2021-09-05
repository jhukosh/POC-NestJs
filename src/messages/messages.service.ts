import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) { }

  async getAllMessages(): Promise<Message[]> {
    return await this.messagesRepository.find({select: ["content", "senderId", "createdAt"]});
  }

  async getUserMessages(userId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      select: ["content", "senderId", "createdAt"],
      where: [{ "receiver": userId }]
    });
  }

  async getOneById(messageId: number, userId: number): Promise<Message> {
    const message: Message = await this.messagesRepository.findOneOrFail(messageId, {
      select: ["id", "content", "senderId", "createdAt"],
      where: [{ "receiverId": userId }]
    });
    if (!message.id) {
      throw new NotFoundException({ messageId }, 'Message not found - unable to update');
    }
    return message;
  }

  async createMessage(userId: number, message: Message): Promise<Message> {
    message.senderId = userId;
    message.receiverId = message.receiver;
    message.read = false;
    return await this.messagesRepository.save(message);
  }

  // TODO put transactions here
  async updateContent(messageId: number, userId: number, message: Message) {
    const oldMessage: Message = await this.messagesRepository.findOneOrFail(messageId, {
      where: { senderId: userId },
    });
    if (!message.id) {
      throw new NotFoundException({ messageId }, 'Message not found - unable to update');
    }
    // 1- Copy old message in messages_history
    // 2- Update message in message
    message.read = oldMessage.read;
    message.createdAt = oldMessage.createdAt;
    message.updatedAt = new Date();
    await this.messagesRepository.update(messageId, message);
    return message;
  }

  async markAsRead(messageId: number, userId: number) {
    const message: Message = await this.messagesRepository.findOneOrFail(messageId, {
      where: { receiverId: userId },
    });
    if (!message.id) {
      throw new NotFoundException({ messageId }, 'Message not found - unable to update');
    }
    message.read = true;
    await this.messagesRepository.update(messageId, message);
    return message;
  }

  // TODO put transactions here
  async deleteMessage(messageId: number, userId: number) {
    const message: Message = await this.messagesRepository.findOneOrFail(messageId, {
      where: { receiverId: userId },
    });
    if (!message.id) {
      throw new NotFoundException({ messageId }, 'Message not found - unable to delete');
    }
    return this.messagesRepository.delete(messageId);
  }
}
