import { Injectable } from "@nestjs/common";

// dto
import { CreateUserDto } from "../../users/dto/create-user.dto";

// repository
import { UserRepository } from "../user-repository";
import { PrismaService } from "../../lib/prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor (private readonly prismaService: PrismaService) {}

    async create(data: CreateUserDto) {
        const createUser = await this.prismaService.user.create({
            data: data
        })

        return createUser
    }

    async validateUser(email: string) {
        const findUserByEmail = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        return findUserByEmail
    }

}