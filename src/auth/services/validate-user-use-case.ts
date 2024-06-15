import { Injectable } from "@nestjs/common";
import { PrismaUserRepository } from "../../repository/prisma/prisma-user-repository";

@Injectable()
export class ValidateUserUseCase {
    constructor (private readonly prismaUserRepository: PrismaUserRepository) {}

    async execute(email: string) {
        
        const findUser = await this.prismaUserRepository.validateUser(email)

        return findUser
    }
}