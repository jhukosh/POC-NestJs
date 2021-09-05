import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(user: User): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(userId: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['name', 'email', 'phoneNumber'],
      where: [{ id: userId }],
    });
  }

  async createUser(user: User) {
    this.usersRepository.save(user);
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
