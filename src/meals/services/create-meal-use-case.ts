import { Injectable } from "@nestjs/common";
import { PrismaMealsRepository } from "../../repository/prisma/prisma-meals-repository";
import { CreateMealDto } from "../dto/create-meal.dto";

@Injectable()
export class CreateMealUseCase {

    constructor(private readonly prismaMealsRepository: PrismaMealsRepository) {}

    async execute(data: CreateMealDto) {
        return await this.prismaMealsRepository.create(data)
    }

}