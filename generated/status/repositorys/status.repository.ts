import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from '../models/status.model';
import { UpdateStatusDto } from '../dtos/status.update.dto';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectModel(Status)
    private readonly model: typeof Status
  ) {}

  findAll() {
    // TODO: implement repository method

return this.model.findAll();  }
  findOneById(id: number) {
    // TODO: implement repository method

return this.model.findOne(
          { where: { id } }
        );  }
  update(id: number, updateDto: UpdateStatusDto) {
    // TODO: implement repository method

return this.model.update(
          updateDto,
          { where: { id } }
        );  }
}
