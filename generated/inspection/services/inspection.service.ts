import { Injectable } from '@nestjs/common';
import { InspectionStrategyFactory } from '../strategies/inspection-strategy.factory';

import { InspectionResponseGeneralResponseDto } from '../dtos/inspection.response.dto';



@Injectable()
export class InspectionService {
  constructor(
    private readonly strategyFactory: InspectionStrategyFactory

  ) {}


}
