import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user-use-case';
import { GenerateHashPasswordUseCase } from './generate-hash-password-use-case';
import { PrismaUserRepository } from '../../repository/prisma/prisma-user-repository';
import { PrismaService } from '../../lib/prisma.service';
import { Prisma } from '@prisma/client';
import { randomInt, randomUUID } from 'crypto';

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase;
  const emailRandom = `${randomInt(500,1000)}@gmail.com`

  const userFake: Prisma.UserCreateInput = {
    email: emailRandom,
    name: 'jhon doe',
    password: "1234567",
    id: randomUUID(),
  }

  const prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(userFake) 
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        GenerateHashPasswordUseCase,
        PrismaUserRepository,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ],
    }).compile();

    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {

    const createUser = await service.execute({
      email: emailRandom,
      name: 'jhon doe',
      password: "1234567",
    })

    expect(createUser).toEqual(
      expect.objectContaining({
        email: emailRandom,
        name: 'jhon doe',
        password: "1234567",
      })
    )
  })
});
