import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum ActionType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity()
export class MessagesHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ActionType,
    // default: ActionType.UPDATE,
    nullable: false,
  })
  action: ActionType;

  @Column()
  originalId: number;

  @CreateDateColumn()
  createdAt: Date;
}
