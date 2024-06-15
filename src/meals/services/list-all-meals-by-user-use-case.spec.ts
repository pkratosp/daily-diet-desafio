import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma.service';
import { PrismaMealsRepository } from '../../repository/prisma/prisma-meals-repository';
import { ListAllMealsByUserUseCase } from './list-all-meals-by-user-use-case';


describe('List all meals service', () => {
  let service: ListAllMealsByUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAllMealsByUserUseCase,
        PrismaService,
        PrismaMealsRepository,
      ],
    }).compile();

    service = module.get<ListAllMealsByUserUseCase>(ListAllMealsByUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo("user should view all meals")

});
