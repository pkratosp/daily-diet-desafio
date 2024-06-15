import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

// services
import { CreateUserUseCase } from './services/create-user-use-case';
import { GenerateHashPasswordUseCase } from './services/generate-hash-password-use-case';
import { PrismaUserRepository } from '../repository/prisma/prisma-user-repository';
import { PrismaService } from '../lib/prisma.service';


describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CreateUserUseCase,
        GenerateHashPasswordUseCase,
        PrismaUserRepository,
        PrismaService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
