import { Injectable } from '@nestjs/common';
import { Inspection } from '../models/inspection.model';
import { inspectionStrategy } from './inspection-strategy.interface';

@Injectable()
export class SafetyInspectionStrategy implements inspectionStrategy {
  async create(data: any): Promise<Inspection> {
    // TODO: 加上 安全巡检 相关逻辑
    return Inspection.create({
      ...data,
      type: 'SafetyInspection',
    });
  }
}
