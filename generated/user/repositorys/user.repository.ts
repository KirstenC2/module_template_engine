import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UpdateUserEmailDto } from '../dtos/user.update.dto';
import { UpdateUserProfileDto } from '../dtos/user.update.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly model: typeof User
  ) {}

  findAll() {
    // TODO: implement repository method

return this.model.findAll();  }
  findOneById(id: number) {
    // TODO: implement repository method

return this.model.findOne(
          { where: { id } }
        );  }
  updateEmail(id: number, updateDto: UpdateUserEmailDto) {
    // TODO: implement repository method

return this.model.update(
          updateDto,
          { where: { id } }
        );  }
  updateProfile(id: number, updateDto: UpdateUserProfileDto) {
    // TODO: implement repository method

return this.model.update(
          updateDto,
          { where: { id } }
        );  }
}
