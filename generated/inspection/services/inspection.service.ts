import { Injectable } from '@nestjs/common';
import { Inspection } from '../models/inspection.model';
import { InspectionRepository } from '../repositorys/inspection.repository';
import { InspectionStrategyFactory } from '../strategies/inspection-strategy.factory';

import { InspectionResponseGeneralResponseDto } from '../dtos/inspection.response.dto';

import { UpdateInspectionDto } from '../dtos/inspection.update.dto';

@Injectable()
export class InspectionService {
  constructor(
    private readonly strategyFactory: InspectionStrategyFactory
      , 
    private readonly inspectionRepository: InspectionRepository
  ) {}

    async findAll(
    ): Promise<InspectionResponseGeneralResponseDto[] | null> {
          let result = await this.inspectionRepository.findAll(
          );
          return result ;
    }
    async findOne(
        id: number
    ): Promise<InspectionResponseGeneralResponseDto | null> {
          let result = await this.inspectionRepository.findOneById(
              id
          );
          return result ;
    }
    async update(
        id: number
        , dto: UpdateInspectionDto
    ): Promise<InspectionResponseGeneralResponseDto | null> {
          let [affectedCount] = await this.inspectionRepository.update(
              id,
            dto
          );
          if (affectedCount === 0) {
            return null;
          }
          return this.findOne(id);
    }

}
