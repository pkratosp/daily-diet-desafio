import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

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
                secret: process.env.SECRET_TOKEN,
                expiresIn: '24h'
            }
        )

        return acessToken
    }

}