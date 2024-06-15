import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ValidateUserUseCase } from "../services/validate-user-use-case";

type UserType = {
    username: string,
    id: string,
    name: string,
    iat: number,
    exp: number
  }

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy,'jwt') {

    constructor(
        private readonly validateUserUseCase: ValidateUserUseCase,
    ) {
        super({
            secretOrKey: process.env.SECRET_TOKEN,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        })
    }

    async validate(payload: UserType) {


        const validateUser = await this.validateUserUseCase.execute(payload.username)

        if(!validateUser) {
            throw new UnauthorizedException('token invalido')
        }

        return {
            validateUser
        }

    }

}