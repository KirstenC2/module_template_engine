import { Injectable } from '@nestjs/common';
import { Inspection } from '../models/inspection.model';
import { InspectionStrategy } from './inspection-strategy.interface';

@Injectable()
export class QualityInspectionStrategy implements InspectionStrategy {
  async create(data: any): Promise<Inspection> {
    // TODO: 加上 质量巡检 相关逻辑
    return Inspection.create({
      ...data,
      type: 'QualityInspection',
    });
  }
}
