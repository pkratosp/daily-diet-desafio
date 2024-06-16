import { Test, TestingModule } from '@nestjs/testing';
import { CreateMealUseCase } from './create-meal-use-case';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { randomUUID } from 'crypto';

describe('Create new meal service', () => {
  let service: CreateMealUseCase;
  const userIdFake = randomUUID()

  const mealFake = {
    id: randomUUID(),
    name: 'nova refeição',
    description: 'salada',
    isOnTheDiet: true,
    userId: userIdFake
  }

  const prismaMock = {
    meals: {
      create: jest.fn().mockReturnValue(mealFake)
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMealUseCase,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<CreateMealUseCase>(CreateMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("user should create new meal", async () => {

    const createMeal = await service.execute({
      name: 'nova refeição',
      description: 'salada',
      isOnTheDiet: true,
      userId: userIdFake
    })

    expect(createMeal).toEqual(
      expect.objectContaining({
        name: 'nova refeição',
        description: 'salada',
        isOnTheDiet: true,
        userId: userIdFake
      })
    )

  })

});
