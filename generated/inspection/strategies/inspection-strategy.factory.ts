import { Injectable } from '@nestjs/common';
import { SafetyInspectionStrategy } from './safetyInspectionStrategy.strategy';
import { EquipmentInspectionStrategy } from './equipmentInspectionStrategy.strategy';
import { QualityInspectionStrategy } from './qualityInspectionStrategy.strategy';

@Injectable()
export class InspectionStrategyFactory {
  constructor(
    private readonly safetyInspectionStrategy: SafetyInspectionStrategy,
    private readonly equipmentInspectionStrategy: EquipmentInspectionStrategy,
    private readonly qualityInspectionStrategy: QualityInspectionStrategy,
  ) {}

  getStrategy(type: string): inspectionStrategy {
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
