import { Controller, Post, Body, UsePipes, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './services/create-user-use-case';
import { ZodValidationSchemas } from 'src/utils/zod-validation-schema';
import { schemaCreateUser } from './users.zod.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('users')
export class UsersController {

  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationSchemas(schemaCreateUser))
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto)
    } catch (error) {
      
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ConflictException('Não é possivel cadastrar este e-mail')
        }
      }

      if(error instanceof Error) {
        throw new InternalServerErrorException('Erro interno')
      }

      throw error
    }
  }

}
