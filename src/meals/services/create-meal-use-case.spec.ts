import { Test, TestingModule } from '@nestjs/testing';
import { CreateMealUseCase } from './create-meal-use-case';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';


describe('Create new meal service', () => {
  let service: CreateMealUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMealUseCase,
        PrismaService,
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<CreateMealUseCase>(CreateMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo("user should create new meal")

});
