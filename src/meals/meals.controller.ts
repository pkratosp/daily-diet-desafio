import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, UsePipes, InternalServerErrorException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

import { AuthGuard } from '@nestjs/passport';
import { AuthGuardToken } from '../auth/strategies/auth-guard-token';

// services
import { CreateMealUseCase } from './services/create-meal-use-case';
import { UpdateMealUseCase } from './services/update-meal-use-case';
import { DeleteMealUseCase } from './services/delete-meal-use-case';
import { FindUniqueMealByUseCase } from './services/find-unique-meal-by-user-use-case';
import { ListAllMealsByUserUseCase } from './services/list-all-meals-by-user-use-case';
import { ZodValidationSchemas } from '../utils/zod-validation-schema';


import { createNewMeal } from './meals.zod.schema';

@Controller('meals')
export class MealsController {
  
  constructor(
    private readonly createMealUseCase: CreateMealUseCase,
    private readonly updateMealUseCase: UpdateMealUseCase,
    private readonly deleteMealUseCase: DeleteMealUseCase,
    private readonly findUniqueMealByUseCase: FindUniqueMealByUseCase,
    private readonly listAllMealsByUserUseCase: ListAllMealsByUserUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  @UsePipes(new ZodValidationSchemas(createNewMeal))
  async create(@Body() createMealDto: CreateMealDto, @Request() req) {
    try {

      const { userAuth } = req

      const createNewMeal = await this.createMealUseCase.execute({
        ...createMealDto,
        userId: userAuth.id
      })

      return {
        id: createNewMeal.id
      }
      
    } catch (error) {

      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async findAll(@Request() req) {
    try {

      const { userAuth } = req


    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async findOne(@Param('id') id: string, @Request() req) {
    try {

      const { userAuth } = req
      
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto, @Request() req) {
    try {

      const { userAuth } = req
      
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuardToken)
  async remove(@Param('id') id: string, @Request() req) {
    try {

      const { userAuth } = req
      
    } catch (error) {
      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }
}
