import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// services
import { CreateUserUseCase } from './services/create-user-use-case';
import { GenerateHashPasswordUseCase } from './services/generate-hash-password-use-case';

// repository
import { PrismaUserRepository } from '../repository/prisma/prisma-user-repository';
import { PrismaService } from '../lib/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GenerateHashPasswordUseCase,
    PrismaUserRepository,
    PrismaService
  ],
})
export class UsersModule {}
