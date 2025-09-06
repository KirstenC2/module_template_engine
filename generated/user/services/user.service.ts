import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserRepository } from '../repositorys/user.repository';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }
}