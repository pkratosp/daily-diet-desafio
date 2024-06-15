import { Injectable } from "@nestjs/common";
import { PrismaMealsRepository } from "../../repository/prisma/prisma-meals-repository";

@Injectable()
export class FindUniqueMealByUseCase {
    
    constructor(private readonly prismaMealsRepository: PrismaMealsRepository) {}

    async execute() {
        
    }
}