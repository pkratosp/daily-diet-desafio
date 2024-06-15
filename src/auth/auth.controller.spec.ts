import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { GenerateTokenUseCase } from './services/generate-token-use-case';
import { SignInUseCase } from './services/sign-in-use-case';
import { ValidateUserUseCase } from './services/validate-user-use-case';
import { JWTStrategy } from './strategies/jwt-strategy';
import { PrismaUserRepository } from '../repository/prisma/prisma-user-repository';
import { PrismaService } from '../lib/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
    
        GenerateTokenUseCase,
        SignInUseCase,
        ValidateUserUseCase,
        JWTStrategy,
    
        PrismaUserRepository,
        PrismaService
    
      ],
      imports: [
        PassportModule,
        JwtModule,
        UsersModule
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
