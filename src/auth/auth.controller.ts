import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from './services/sign-in-use-case';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInSupabaseUseCase } from './services/sign-in-supabase-use-case';
import { RefreshTokenSupaBaseUseCase } from './services/refresh-token-supabase-use-case';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signInSupabaseUseCase: SignInSupabaseUseCase,
    private readonly refreshTokenSupaBaseUseCase: RefreshTokenSupaBaseUseCase
  ) {}


  @Post()
  async authUser(@Body() data: SignInDTO) {
    // return await this.signInUseCase.execute(data)
    return await this.signInSupabaseUseCase.execute(data)
  }

  @Post('refresh/token')
  async refreshToken(@Body() data: { refreshToken: string }) {
    return await this.refreshTokenSupaBaseUseCase.execute({ refreshToken: data.refreshToken })
  }
}
