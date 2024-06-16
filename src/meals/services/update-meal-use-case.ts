import { Injectable } from "@nestjs/common";
import { PrismaMealsRepository } from "../../repository/prisma/prisma-meals-repository";
import { UpdateMealDto } from "../dto/update-meal.dto";

@Injectable()
export class UpdateMealUseCase {

    constructor(private readonly prismaMealsRepository: PrismaMealsRepository) {}

    async execute(id: string, userId: string, data:UpdateMealDto) {
        return await this.prismaMealsRepository.update(id,userId,data)
    }
}