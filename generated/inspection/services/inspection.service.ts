import { Injectable } from '@nestjs/common';
import { InspectionStrategyFactory } from '../strategies/inspection-strategy.factory';

@Injectable()
export class InspectionService {
  constructor(
    private readonly strategyFactory: InspectionStrategyFactory

  ) {}

  async create(data: any) {
    const strategy = this.strategyFactory.getStrategy(data.type);
    return strategy.create(data);
  }

  async findAll(){
    throw new Error('findAll not supported (no repository)');
  }

  async findOne(id: number){
    throw new Error('findOne not supported (no repository)');
  }
}
