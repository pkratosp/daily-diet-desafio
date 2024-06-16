import { Injectable } from "@nestjs/common";
import { PrismaMealsRepository } from "../../repository/prisma/prisma-meals-repository";

@Injectable()
export class MetricsMealsUseCase {

    constructor(private readonly prismaMealsRepository: PrismaMealsRepository) {}

    async execute(userId: string) {

        const [totalMeals, totalMealsInTheDiet, totalMealsNotTheDiet, bestSequenceInTheDiet] = await Promise.all([
            this.prismaMealsRepository.count(userId),
            this.prismaMealsRepository.countIsOnTheDiet(userId, true),
            this.prismaMealsRepository.countIsOnTheDiet(userId, false),
            this.prismaMealsRepository.bestSequenceOfMealsWithinTheDiet(userId)
        ])

        return {
            totalMeals, 
            totalMealsInTheDiet, 
            totalMealsNotTheDiet, 
            bestSequenceInTheDiet
        }

    }

}