import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

@Injectable()
export class GenerateHashPasswordUseCase {

    async execute(password: string) {

        const hashPassword = await hash(password, 6)

        return hashPassword
    }

}