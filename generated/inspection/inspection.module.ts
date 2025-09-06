import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inspection } from './inspection.model';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';

@Module({
  imports: [SequelizeModule.forFeature([Inspection])],
  providers: [InspectionService],
  controllers: [InspectionController],
})
export class InspectionModule {}