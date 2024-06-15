import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user-use-case';
import { GenerateHashPasswordUseCase } from './generate-hash-password-use-case';
import { PrismaUserRepository } from '../../repository/prisma/prisma-user-repository';
import { PrismaService } from '../../lib/prisma.service';

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        GenerateHashPasswordUseCase,
        PrismaUserRepository,
        PrismaService
      ],
    }).compile();

    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('should create new user')
});
