import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(type => User)
  @JoinColumn({ 
    name: 'senderId'
  })
  sender: number;

  @ManyToOne(type => User)
  @JoinColumn({ 
    name: 'receiverId'
  })
  receiver: number;

  @Column('date')
  createdAt: Date;
}
