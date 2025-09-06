import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inspection } from '../models/inspection.model';
import { InspectionRepository } from '../repositorys/inspection.repository';

@Injectable()
export class InspectionService {
  constructor(
    private readonly inspectionRepository: InspectionRepository
      ) {}

  async create(data: any): Promise<Inspection> {
    return this.inspectionRepository.create(data);
  }

  async findAll(): Promise<Inspection[]> {
    return this.inspectionRepository.findAll();
  }

  async findOne(id: number): Promise<Inspection | null> {
    return this.inspectionRepository.findOne(id);
  }
}
