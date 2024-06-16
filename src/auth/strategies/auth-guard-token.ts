import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { env } from "../../lib/env";


@Injectable()
export class AuthGuardToken implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        const token = this.extractTokenFromHeader(request)

        if(!token) {
            throw new UnauthorizedException('Token invalido')
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: env.SECRET_TOKEN
                }
            )

            request['userAuth'] = payload
        } catch (error) {
            throw new UnauthorizedException('Token invalido')
        }

        return true
        
    }

    private extractTokenFromHeader(@Request() request) {
        const [type, token] = request.headers.authorization.split(' ') ?? []

        return type === 'Bearer' ? token : undefined;
    }
}