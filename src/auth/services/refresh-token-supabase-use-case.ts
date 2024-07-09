import { Injectable } from "@nestjs/common";
import { env } from "src/lib/env";

type RequestType = {
    refreshToken: string
}

@Injectable()
export class RefreshTokenSupaBaseUseCase {
    async execute({ refreshToken }: RequestType) {
        const revalidateToken = await fetch(`${env.URL_SUPABASE}/auth/v1/token?grant_type=refresh_token`, {
            body: JSON.stringify({
                refresh_token: refreshToken
            }),
            headers: {
                apiKey: env.PUBLIC_KEY_SUPABASE
            },
            method: 'POST'
        })

        const response = await revalidateToken.json()

        return response
    }
}