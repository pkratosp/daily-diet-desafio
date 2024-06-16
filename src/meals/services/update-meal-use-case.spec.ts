import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { UpdateMealUseCase } from './update-meal-use-case';
import { randomUUID } from 'crypto';


describe('Update meal service', () => {
  let service: UpdateMealUseCase;
  const userIdFake = randomUUID()
  const mealIdFake = randomUUID()

  const mealFake = {
    id: mealIdFake,
    name: 'nova refeição',
    description: 'salada',
    isOnTheDiet: true,
    userId: userIdFake
  }

  const prismaMock = {
    meals: {
      update: jest.fn().mockReturnValue(mealFake)
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMealUseCase,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<UpdateMealUseCase>(UpdateMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("user should update data in unique meal", async () => {
    const updateMeal = await service.execute(mealIdFake, userIdFake, {
      description: 'atualizando dado'
    })

    expect(updateMeal.id).toEqual(expect.any(String))
  })

});
