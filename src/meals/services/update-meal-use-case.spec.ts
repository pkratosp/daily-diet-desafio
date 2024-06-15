import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { UpdateMealUseCase } from './update-meal-use-case';


describe('Update meal service', () => {
  let service: UpdateMealUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMealUseCase,
        PrismaService,
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<UpdateMealUseCase>(UpdateMealUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo("user should update data in unique meal")

});
