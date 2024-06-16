import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { DeleteMealUseCase } from './delete-meal-use-case';
import { randomUUID } from 'crypto';


describe('Delete meal serivce', () => {
  let service: DeleteMealUseCase;
  const mealIdFake = randomUUID()
  const userIdFake = randomUUID()

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
        DeleteMealUseCase,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<DeleteMealUseCase>(DeleteMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("user should delte meal", async () => {

    const deleteMeal = await service.execute(mealIdFake,userIdFake)

    expect(deleteMeal).toEqual(true)
  })

});
