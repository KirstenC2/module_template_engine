import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../repositorys/user.repository';

import { UserResponseGeneralResponseDto } from '../dtos/user.response.dto';
import { UserInfoResponseDto } from '../dtos/user.response.dto';

import { UpdateUserEmailDto } from '../dtos/user.update.dto';
import { UpdateUserProfileDto } from '../dtos/user.update.dto';

@Injectable()
export class UserService {
  constructor(
      
    private readonly userRepository: UserRepository
  ) {}

    async findAll(
    ): Promise<UserResponseGeneralResponseDto[] | null> {
          let result = await this.userRepository.findAll(
          );
          return result ;
    }
    async findOne(
        id: number
    ): Promise<UserInfoResponseDto | null> {
          let result = await this.userRepository.findOneById(
              id
          );
          return result ;
    }
    async updateEmail(
        id: number
        , dto: UpdateUserEmailDto
    ): Promise<UserInfoResponseDto | null> {
          let [affectedCount] = await this.userRepository.updateEmail(
              id,
            dto
          );
          if (affectedCount === 0) {
            return null;
          }
          return this.findOne(id);
    }
    async updateProfile(
        id: number
        , dto: UpdateUserProfileDto
    ): Promise<UserResponseGeneralResponseDto | null> {
          let [affectedCount] = await this.userRepository.updateProfile(
              id,
            dto
          );
          if (affectedCount === 0) {
            return null;
          }
          return this.findOne(id);
    }

}
