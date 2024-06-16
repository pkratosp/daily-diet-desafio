import { Injectable } from "@nestjs/common";
import { PrismaMealsRepository } from "../../repository/prisma/prisma-meals-repository";

@Injectable()
export class ListAllMealsByUserUseCase {

    constructor(private readonly prismaMealsRepository: PrismaMealsRepository) {}

    async execute(userId: string) {
        const listAll = await this.prismaMealsRepository.findAll(userId)

        return {
            listMeals: listAll
        }
    }
}