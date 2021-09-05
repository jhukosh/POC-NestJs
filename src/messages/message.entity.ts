import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MessageType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MessageType,
    // default: MessageType.EMAIL,
    nullable: false,
  })
  type: MessageType;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: false,
  })
  content: string;
  
  @Column({ type: "int", nullable: true })
  senderId: number;
  @ManyToOne(() => User, user => user.messagesSent)
  @JoinColumn({ 
    name: 'senderId'
  })
  sender: User;

  @Column({type: "int", nullable: true })
  receiverId: number;
  @ManyToOne(() => User, user => user.messagesReceived)
  @JoinColumn({ 
    name: 'receiverId'
  })
  receiver: User;

  @Column({
    type:'boolean',
    nullable: false,
    default: false
  })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
