import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ValidateUserUseCase } from "./validate-user-use-case";
import { GenerateTokenUseCase } from "./generate-token-use-case";
import { compare } from "bcryptjs";

type RequestType = {
    username: string,
    password: string
}

@Injectable()
export class SignInUseCase {

    constructor(
        private readonly validateUserUseCase: ValidateUserUseCase,
        private readonly generateTokenUseCase: GenerateTokenUseCase
    ) {}

    async execute({ username, password }: RequestType) {
    
        const findUser = await this.validateUserUseCase.execute(username)

        if(!findUser) {
            throw new UnauthorizedException('Credenciais invalidas')
        }

        const compareHashPassword = await compare(password, findUser.password)

        if(compareHashPassword === false) {
            throw new UnauthorizedException('Credenciais invalidas')
        }

        const tokenGenerate = await this.generateTokenUseCase.execute(findUser.email, findUser.id, findUser.name)

        return {
            token: tokenGenerate,
            user: {
                id: findUser.id,
                name: findUser.name,
                username: findUser.email,
            }
        }

    }

}