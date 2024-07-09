import { Injectable, UnauthorizedException } from "@nestjs/common";
import { supabase } from "src/lib/supabase";

type RequestType = {
    username: string
    password: string
}

@Injectable()
export class SignInSupabaseUseCase {
    async execute({ password, username }: RequestType) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        })

        if(error?.message) {
            throw new UnauthorizedException('Credenciais invalidas')
        }

        return data
    }
}