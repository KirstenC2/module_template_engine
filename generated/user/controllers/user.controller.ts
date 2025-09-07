import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserResponseGeneralResponseDto } from '../dtos/user.response.dto';
import { UserInfoResponseDto } from '../dtos/user.response.dto';
import { UpdateUserEmailDto } from '../dtos/user.update.dto';
import { UpdateUserProfileDto } from '../dtos/user.update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  findAll(
  ) {
    return this.service.findAll(
      
      
    );
  }
  @Get(':id')
  findOne(
    @Param('id') id: number
  ) {
    return this.service.findOne(
      
      id
    );
  }
  @Patch('')
  updateEmail(
    @Body() dto: UpdateUserEmailDto
  ) {
    return this.service.updateEmail(
      dto
      
    );
  }
  @Patch('')
  updateProfile(
    @Body() dto: UpdateUserProfileDto
  ) {
    return this.service.updateProfile(
      dto
      
    );
  }
}
