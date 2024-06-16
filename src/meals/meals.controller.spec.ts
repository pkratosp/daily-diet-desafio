import { Test, TestingModule } from '@nestjs/testing';
import { MealsController } from './meals.controller';

// repository
import { PrismaService } from '../lib/prisma.service';
import { PrismaMealsRepository } from '../repository/prisma/prisma-meals-repository';

// use cases or services
import { CreateMealUseCase } from './services/create-meal-use-case';
import { DeleteMealUseCase } from './services/delete-meal-use-case';
import { FindUniqueMealByUseCase } from './services/find-unique-meal-by-user-use-case';
import { ListAllMealsByUserUseCase } from './services/list-all-meals-by-user-use-case';
import { UpdateMealUseCase } from './services/update-meal-use-case';
import { JwtService } from '@nestjs/jwt';

describe('MealsController', () => {
  let controller: MealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<MealsController>(MealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
