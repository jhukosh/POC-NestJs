import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum MessageType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MessageType,
    // default: MessageType.EMAIL,
    nullable: false,
  })
  role: MessageType;

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
    name: 'senderId'
  })
  receiver: number;

  @Column({
    type: 'timestamp',
    // TODO put this to false
    nullable: true,
  })
  createdAt: Date;
}
