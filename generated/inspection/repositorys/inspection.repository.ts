import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inspection } from '../models/inspection.model';


@Injectable()
export class InspectionRepository {
  constructor(
    @InjectModel(Inspection)
    private readonly inspectionModel: typeof Inspection
  ) {}

  async create(data: any): Promise<Inspection> {
    return this.inspectionModel.create(data);
  }

  async findAll(): Promise<Inspection[]> {
    return this.inspectionModel.findAll();
  }

  async findOne(id: number): Promise<Inspection | null> {
    return this.inspectionModel.findOne({ where: { id } });
  }
}