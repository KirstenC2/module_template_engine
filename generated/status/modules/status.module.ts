import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from '../models/status.model';
import { StatusService } from '../services/status.service';
import { StatusController } from '../controllers/status.controller';
import { StatusRepository } from '../repositorys/status.repository';

@Module({
  imports: [SequelizeModule.forFeature([Status])],
  providers: [
    StatusService,
    StatusRepository
  ],
  controllers: [StatusController],
})
export class StatusModule {}
