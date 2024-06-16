import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, UsePipes, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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


import { createNewMeal, schemaUpdateMeal } from './meals.zod.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

      const list = await this.listAllMealsByUserUseCase.execute(userAuth.id)

      return list

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

      const findMeal = await this.findUniqueMealByUseCase.execute(id,userAuth.id)

      return findMeal
      
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
  // @UsePipes(new ZodValidationSchemas(schemaUpdateMeal))
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto, @Request() req) {
    try {

      const { userAuth } = req

      const updateMeal = await this.updateMealUseCase.execute(id, userAuth.id, updateMealDto)
      

      return {
        updateMeal
      }

    } catch (error) {

      console.log(error)

      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2025') {
          throw new BadRequestException('Registro não encontrado')
        }
      }

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

      const deleteMeal = await this.deleteMealUseCase.execute(id, userAuth.id)

      return {
        deleteMeal
      }
      
    } catch (error) {
      
      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }
}
