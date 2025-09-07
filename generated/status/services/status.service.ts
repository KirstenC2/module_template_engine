import { Injectable } from '@nestjs/common';
import { Status } from '../models/status.model';
import { StatusRepository } from '../repositorys/status.repository';

import { StatusResponseGeneralResponseDto } from '../dtos/status.response.dto';

import { UpdateStatusDto } from '../dtos/status.update.dto';


@Injectable()
export class StatusService {
  constructor(
    
    private readonly statusRepository: StatusRepository

  ) {}

  async findAll(
  ): Promise<StatusResponseGeneralResponseDto> {
      throw new Error('findAll not supported');
  }
  async findOne(
      id: number
  ): Promise<StatusResponseGeneralResponseDto> {
      throw new Error('findOne not supported');
  }
  async update(
      dto: UpdateStatusDto
  ): Promise<StatusResponseGeneralResponseDto> {
      // TODO: implement update
      return {} as StatusResponseGeneralResponseDto;
      }

}
