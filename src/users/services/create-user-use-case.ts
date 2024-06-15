import { Injectable } from "@nestjs/common";

// dto
import { CreateUserDto } from "../dto/create-user.dto";

// service
import { GenerateHashPasswordUseCase } from "./generate-hash-password-use-case";

// repository
import { PrismaUserRepository } from "../../repository/prisma/prisma-user-repository";


@Injectable()
export class CreateUserUseCase {
    
    constructor(
        private readonly generateHashPasswordUseCase: GenerateHashPasswordUseCase,
        private readonly prismaUserRepository: PrismaUserRepository
    ){}

    async execute(data: CreateUserDto) {

        const generateHashPassword = await this.generateHashPasswordUseCase.execute(data.password)

        return await this.prismaUserRepository.create({
            ...data,
            password: generateHashPassword
        })
    }

}