import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inspection } from '../models/inspection.model';
import { UpdateInspectionDto } from '../dtos/inspection.update.dto';

@Injectable()
export class InspectionRepository {
  constructor(
    @InjectModel(Inspection)
    private readonly model: typeof Inspection
  ) {}

  findAll() {
    // TODO: implement repository method

return this.model.findAll();  }
  findOneById(id: number) {
    // TODO: implement repository method

return this.model.findOne(
          { where: { id } }
        );  }
  update(id: number, updateDto: UpdateInspectionDto) {
    // TODO: implement repository method

return this.model.update(
          updateDto,
          { where: { id } }
        );  }
}
