import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../repositorys/user.repository';

@Injectable()
export class UserService {
  constructor(
    
    private readonly userRepository: UserRepository

  ) {}

  async create(data: any) {
    return this.userRepository.create(data);
  }

  async findAll(){
    return this.userRepository.findAll();
  }

  async findOne(id: number){
    return this.userRepository.findOne(id);
  }
}
