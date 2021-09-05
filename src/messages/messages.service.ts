import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, createQueryBuilder, Repository } from 'typeorm';
import { Message } from './message.entity';
import { ActionType, MessagesHistory } from './messages-history.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly messagesRepository: Repository<Message>,
    private readonly connection: Connection,
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return await this.messagesRepository.find({
      select: ['content', 'senderId', 'createdAt'],
      relations: ['sender'],
      loadRelationIds: false
    });
  }

  async getUserMessages(userId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      select: ['content', 'senderId', 'createdAt'],
      relations: ['sender'],
      loadRelationIds: false,
      where: [{ receiver: userId }]
    });
  }

  async getOneById(messageId: number): Promise<Message> {
    let message: Message;
    try {
      message = await this.messagesRepository.findOneOrFail(
        messageId,
        {
          select: ['id', 'content', 'senderId', 'createdAt'],
          relations: ['sender'],
          loadRelationIds: false,
          where: [{ id: messageId }]
        }
      );
    } catch (err) {
      throw new NotFoundException(
        err,
        `Message with id ${messageId} not found - unable to update`,
      );
    }
    return message;
  }

  async createMessage(userId: number, message: Message): Promise<Message> {
    message.senderId = userId;
    message.read = false;
    return await this.messagesRepository.save(message);
  }

  async updateContent(messageId: number, userId: number, message: Message) {
    let oldMessage: Message;
    try {
      oldMessage = await this.messagesRepository.findOneOrFail(
        messageId,
        {
          where: { senderId: userId },
        },
      );
    } catch (err) {
      throw new NotFoundException(
        err,
        `Message with id ${messageId} not found - unable to update`,
      );
    }

    // 1- Copy old message in messages_history table and save it with transaction manager
    const messageToArchived = new MessagesHistory();
    messageToArchived.action = ActionType.UPDATE;
    messageToArchived.originalId = oldMessage.id;
    messageToArchived.originalContent = oldMessage.content;

    // 2- Update message and replace content in message table with transaction manager
    message.read = oldMessage.read;
    message.createdAt = oldMessage.createdAt;
    message.updatedAt = new Date();

    // 3- Use a transaction to run multiple linked queries on different entities
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(messageToArchived);
      await queryRunner.manager.update(Message, messageId, message);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return message;
  }

  async markAsRead(messageId: number, userId: number) {
    const message: Message = await this.messagesRepository.findOneOrFail(
      messageId,
      {
        where: { receiverId: userId },
      },
    );
    if (!message.id) {
      throw new NotFoundException(
        { messageId },
        'Message not found - unable to update',
      );
    }
    message.read = true;
    await this.messagesRepository.update(messageId, message);
    return message;
  }

  async deleteMessage(messageId: number, userId: number) {
    let message: Message;
    try {
      message = await this.messagesRepository.findOneOrFail(
        messageId,
        {
          where: { receiverId: userId },
        },
      );
    } catch (err) {
      throw new NotFoundException(
        err,
        `Message with id ${messageId} not found - unable to delete`,
      );
    }

    const messageToArchived = new MessagesHistory();
    messageToArchived.action = ActionType.DELETE;
    messageToArchived.originalId = message.id;
    messageToArchived.originalContent = message.content;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(messageToArchived);
      await queryRunner.manager.delete(Message, messageId);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return true;
  }
}
