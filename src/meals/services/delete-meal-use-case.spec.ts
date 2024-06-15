import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { DeleteMealUseCase } from './delete-meal-use-case';


describe('Delete meal serivce', () => {
  let service: DeleteMealUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMealUseCase,
        PrismaService,
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<DeleteMealUseCase>(DeleteMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo("user should delte meal")

});
