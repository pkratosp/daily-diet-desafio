import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meals')
export class MealsController {
  constructor() {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {

  }

  @Get()
  async findAll() {

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

  }
}
