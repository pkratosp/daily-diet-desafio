import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { FindUniqueMealByUseCase } from './find-unique-meal-by-user-use-case';
import { randomUUID } from 'crypto';


describe('Find unique meal service', () => {
  let service: FindUniqueMealByUseCase;
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
      findUnique: jest.fn().mockReturnValue(mealFake)
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUniqueMealByUseCase,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<FindUniqueMealByUseCase>(FindUniqueMealByUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("user should find unique meal", async () => {
    const findUnique = await service.execute(mealIdFake,userIdFake)

    expect(findUnique).toEqual(
      expect.objectContaining({
        id: mealIdFake,
        name: 'nova refeição',
        description: 'salada',
        isOnTheDiet: true,
        userId: userIdFake
      })
    )
  })

});
