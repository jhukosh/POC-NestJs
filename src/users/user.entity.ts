import { Message } from 'src/messages/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany( () => Message, message => message.senderId)
  messagesSent: Message[];

  @OneToMany( () => Message, message => message.receiverId)
  messagesReceived: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
