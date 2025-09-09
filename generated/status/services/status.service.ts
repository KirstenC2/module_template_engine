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
    ): Promise<StatusResponseGeneralResponseDto[] | null> {
          let result = await this.statusRepository.findAll(
          );
          return result ;
    }
    async findOne(
        id: number
    ): Promise<StatusResponseGeneralResponseDto | null> {
          let result = await this.statusRepository.findOneById(
              id
          );
          return result ;
    }
    async update(
        id: number
        , dto: UpdateStatusDto
    ): Promise<StatusResponseGeneralResponseDto | null> {
          let [affectedCount] = await this.statusRepository.update(
              id,
            dto
          );
          if (affectedCount === 0) {
            return null;
          }
          return this.findOne(id);
    }

}
