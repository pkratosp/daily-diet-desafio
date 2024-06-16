import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { ListAllMealsByUserUseCase } from './list-all-meals-by-user-use-case';
import { randomUUID } from 'crypto';


describe('List all meals service', () => {
  let service: ListAllMealsByUserUseCase;
  const userIdFake = randomUUID()
  const mealIdFake1 = randomUUID()
  const mealIdFake2 = randomUUID()

  const mealFake = [
    {
      id: mealIdFake1,
      name: 'nova refeição',
      description: 'salada',
      isOnTheDiet: true,
      userId: userIdFake
    },
    {
      id: mealIdFake2,
      name: 'nova refeição',
      description: 'carne',
      isOnTheDiet: true,
      userId: userIdFake
    }
  ]

  const prismaMock = {
    meals: {
      findMany: jest.fn().mockReturnValue(mealFake)
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAllMealsByUserUseCase,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<ListAllMealsByUserUseCase>(ListAllMealsByUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("user should view all meals", async () => {
    const listAll = await service.execute(userIdFake)

    expect(listAll).toEqual(
      expect.objectContaining({
        listMeals: expect.arrayContaining([
          {
            id: mealIdFake1,
            name: 'nova refeição',
            description: 'salada',
            isOnTheDiet: true,
            userId: userIdFake
          },
          {
            id: mealIdFake2,
            name: 'nova refeição',
            description: 'carne',
            isOnTheDiet: true,
            userId: userIdFake
          }
        ])
      })
    )

  })

});
