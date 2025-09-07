import { Injectable } from '@nestjs/common';
import { InspectionStrategyFactory } from '../strategies/inspection-strategy.factory';

import { InspectionResponseGeneralResponseDto } from '../dtos/inspection.response.dto';

import { UpdateInspectionDto } from '../dtos/inspection.update.dto';


@Injectable()
export class InspectionService {
  constructor(
    private readonly strategyFactory: InspectionStrategyFactory

  ) {}

  async findAll(
  ): Promise<InspectionResponseGeneralResponseDto> {
      throw new Error('findAll not supported');
  }
  async findOne(
      id: number
  ): Promise<InspectionResponseGeneralResponseDto> {
      throw new Error('findOne not supported');
  }
  async update(
      dto: UpdateInspectionDto
  ): Promise<InspectionResponseGeneralResponseDto> {
      // TODO: implement update
      return {} as InspectionResponseGeneralResponseDto;
      }

}
