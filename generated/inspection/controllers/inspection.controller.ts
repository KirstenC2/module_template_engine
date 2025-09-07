import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { InspectionService } from '../services/inspection.service';
import { InspectionResponseGeneralResponseDto } from '../dtos/inspection.response.dto';
import { UpdateInspectionDto } from '../dtos/inspection.update.dto';

@Controller('inspections')
export class InspectionController {
  constructor(private readonly service: InspectionService) {}

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
    @Body() dto: UpdateInspectionDto
  ) {
    return this.service.update(
      dto
      
    );
  }
}
