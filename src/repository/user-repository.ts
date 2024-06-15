import { User } from "@prisma/client"
import { CreateUserDto } from "src/users/dto/create-user.dto"

export interface UserRepository {

    create(data: CreateUserDto): Promise<User | null>
    validateUser(email: string): Promise<User | null>
}