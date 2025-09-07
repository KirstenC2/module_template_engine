import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { InspectionService } from '../services/inspection.service';
import { InspectionResponseGeneralResponseDto } from '../dtos/inspection.response.dto';

@Controller('')
export class Controller {
  constructor(private readonly service: InspectionService) {}

}
