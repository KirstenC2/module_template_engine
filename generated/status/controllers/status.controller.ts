import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { StatusResponseGeneralResponseDto } from '../dtos/status.response.dto';
import { UpdateStatusDto } from '../dtos/status.update.dto';

@Controller('statuses')
export class StatusController {
  constructor(private readonly service: StatusService) {}

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
  update(
    @Body() dto: UpdateStatusDto
  ) {
    return this.service.update(
      dto
      
    );
  }
}
