import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(userDto: UserDto) {
    const user: User = this.repo.create(userDto);
    await this.repo.save(user);
  }

  async get(userId: number): Promise<User> {
    return await this.findUser(userId);
  }

  async edit(userId: number, userData: UserDto): Promise<User> {
    const user: User = await this.findUser(userId);
    if (!user) throw new NotFoundException('User does not exist');

    return await this.repo.save(userData);
  }

  async delete(userId: number): Promise<User> {
    const user: User = await this.findUser(userId);
    if (!user) throw new NotFoundException('User does not exist');

    return await this.repo.remove(user);
  }

  async getAll(): Promise<User[]> {
    return await this.repo.find();
  }

  private findUser(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserName(username: string): Promise<User> {
    return this.repo.findOne({ where: { username: username } });
  }
}
