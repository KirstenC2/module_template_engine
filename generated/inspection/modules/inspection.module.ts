import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inspection } from '../models/inspection.model';
import { InspectionService } from '../services/inspection.service';
import { InspectionController } from '../controllers/inspection.controller';
import { InspectionRepository } from '../repositorys/inspection.repository';
import { InspectionStrategyFactory } from '../strategies/inspection-strategy.factory';
import { SafetyInspectionStrategy } from '../strategies/safety-inspection.strategy';
import { EquipmentInspectionStrategy } from '../strategies/equipment-inspection.strategy';
import { QualityInspectionStrategy } from '../strategies/quality-inspection.strategy';

@Module({
  imports: [SequelizeModule.forFeature([Inspection])],
  providers: [
    InspectionService,
    InspectionRepository
      , InspectionStrategyFactory
        , SafetyInspectionStrategy
        , EquipmentInspectionStrategy
        , QualityInspectionStrategy
  ],
  controllers: [InspectionController],
})
export class InspectionModule {}
