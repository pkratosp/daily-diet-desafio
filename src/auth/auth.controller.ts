import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from './services/sign-in-use-case';
import { SignInDTO } from './dto/sign-in.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}


  @Post()
  async authUser(@Body() data: SignInDTO) {
    return await this.signInUseCase.execute(data)
  }
}
