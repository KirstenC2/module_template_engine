import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InspectionService } from './inspection.service';

@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.inspectionService.create(createDto);
  }

  @Get()
  findAll() {
    return this.inspectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionService.findOne(+id);
  }
}