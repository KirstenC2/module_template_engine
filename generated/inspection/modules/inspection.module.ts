import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inspection } from '../models/inspection.model';
import { InspectionService } from '../services/inspection.service';
import { InspectionController } from '../controllers/inspection.controller';
import { InspectionRepository } from '../repositorys/inspection.repository';

@Module({
  imports: [SequelizeModule.forFeature([Inspection])],
  providers: [InspectionService, InspectionRepository],
  controllers: [InspectionController],
})
export class InspectionModule {}