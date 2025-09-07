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

    ) { }

    async findAll(
    ): Promise<UserResponseGeneralResponseDto> {
        throw new Error('findAll not supported');
    }
    async findOne(
        id: number
    ): Promise<UserInfoResponseDto> {
        throw new Error('findOne not supported');
    }
    async updateEmail(
        dto: UpdateUserEmailDto
    ): Promise<UserInfoResponseDto> {
        // TODO: implement updateEmail
        return {} as UserInfoResponseDto;
    }
    async updateProfile(
        dto: UpdateUserProfileDto
    ): Promise<UserResponseGeneralResponseDto> {
        // TODO: implement updateProfile
        return {} as UserResponseGeneralResponseDto;
    }

}
