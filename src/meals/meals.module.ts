import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { JwtService } from '@nestjs/jwt';

// repository
import { PrismaService } from '../lib/prisma.service';
import { PrismaMealsRepository } from '../repository/prisma/prisma-meals-repository';

// use cases or services
import { CreateMealUseCase } from './services/create-meal-use-case';
import { DeleteMealUseCase } from './services/delete-meal-use-case';
import { FindUniqueMealByUseCase } from './services/find-unique-meal-by-user-use-case';
import { ListAllMealsByUserUseCase } from './services/list-all-meals-by-user-use-case';
import { UpdateMealUseCase } from './services/update-meal-use-case';

@Module({
  controllers: [MealsController],
  providers: [
    

    CreateMealUseCase,
    DeleteMealUseCase,
    FindUniqueMealByUseCase,
    ListAllMealsByUserUseCase,
    UpdateMealUseCase,
    CreateMealUseCase,

    JwtService,

    PrismaService,
    PrismaMealsRepository

  ],
})
export class MealsModule {}
