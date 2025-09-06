import { Injectable } from '@nestjs/common';
import { inspectionStrategy } from './inspection-strategy.interface';

@Injectable()
export class InspectionStrategyFactory {
  constructor(
  ) {}

  getStrategy(type: string): inspectionStrategy {
    switch (type) {
      default:
        throw new Error(`未知的巡检类型: ${type}`);
    }
  }
}
