import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';

// service
import { GenerateTokenUseCase } from './services/generate-token-use-case';
import { SignInUseCase } from './services/sign-in-use-case';
import { ValidateUserUseCase } from './services/validate-user-use-case';

// repository
import { PrismaUserRepository } from '../repository/prisma/prisma-user-repository';
import { PrismaService } from '../lib/prisma.service';

// strategies jwt
import { JWTStrategy } from './strategies/jwt-strategy';
import { AuthGuardToken } from './strategies/auth-guard-token';

@Module({
  controllers: [AuthController],
  providers: [
    
    GenerateTokenUseCase,
    SignInUseCase,
    ValidateUserUseCase,
    JWTStrategy,
    AuthGuardToken,

    PrismaUserRepository,
    PrismaService

  ],
  imports: [
    PassportModule,
    JwtModule,
    UsersModule
  ]
})
export class AuthModule {}
