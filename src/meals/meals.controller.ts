import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardToken } from '../auth/strategies/auth-guard-token';

@Controller('meals')
export class MealsController {
  constructor(
    
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async create(@Body() createMealDto: CreateMealDto) {

  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async findAll(@Request() req) {

    const { headers, userAuth, user } = req

    console.log(req.userAuth)
    console.log(req.user)


  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async findOne(@Param('id') id: string) {

  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async remove(@Param('id') id: string) {

  }
}
