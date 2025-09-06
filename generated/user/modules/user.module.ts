import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositorys/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UserService,
    UserRepository
  ],
  controllers: [UserController],
})
export class UserModule {}
