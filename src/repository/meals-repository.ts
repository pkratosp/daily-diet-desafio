import { Meals } from "@prisma/client"
import { CreateMealDto } from "src/meals/dto/create-meal.dto"
import { UpdateMealDto } from "src/meals/dto/update-meal.dto"

export interface MealsRepository {

    create(data: CreateMealDto): Promise<Meals | null>
    update(id: string, userId: string, data: UpdateMealDto): Promise<Meals | null>
    delete(id: string, userId: string): Promise<boolean>
    findUnique(id: string, userId: string): Promise<Meals | null>
    findAll(userId: string): Promise<Array<Meals>>

}