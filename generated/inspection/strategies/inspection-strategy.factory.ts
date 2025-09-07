import { Injectable } from '@nestjs/common';
import { InspectionStrategy } from './inspection-strategy.interface';
import { SafetyInspectionStrategy } from './safety-inspection.strategy';
import { EquipmentInspectionStrategy } from './equipment-inspection.strategy';
import { QualityInspectionStrategy } from './quality-inspection.strategy';

@Injectable()
export class InspectionStrategyFactory {
  constructor(
    private readonly safetyInspectionStrategy: SafetyInspectionStrategy,
    private readonly equipmentInspectionStrategy: EquipmentInspectionStrategy,
    private readonly qualityInspectionStrategy: QualityInspectionStrategy,
  ) {}

  getStrategy(type: string): InspectionStrategy {
    switch (type) {
      case 'SafetyInspection':
        return this.safetyInspectionStrategy;
      case 'EquipmentInspection':
        return this.equipmentInspectionStrategy;
      case 'QualityInspection':
        return this.qualityInspectionStrategy;
      default:
        throw new Error(`未知的巡检类型: ${type}`);
    }
  }
}
