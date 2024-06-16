import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { env } from "../../lib/env";

@Injectable()
export class GenerateTokenUseCase {

    constructor(private readonly jwtService: JwtService) {}

    async execute(username: string, id: string, name: string) {
        const acessToken = this.jwtService.sign(
            {
                username,
                id,
                name
            },
            {
                secret: env.SECRET_TOKEN,
                expiresIn: '24h'
            }
        )

        return acessToken
    }

}