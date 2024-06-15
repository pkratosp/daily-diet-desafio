import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { FindUniqueMealByUseCase } from './find-unique-meal-by-user-use-case';


describe('Find unique meal service', () => {
  let service: FindUniqueMealByUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUniqueMealByUseCase,
        PrismaService,
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<FindUniqueMealByUseCase>(FindUniqueMealByUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo("user should find unique meal")

});
