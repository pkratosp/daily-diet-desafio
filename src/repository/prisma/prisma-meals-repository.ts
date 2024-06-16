import { Injectable } from "@nestjs/common";
// DTO
import { CreateMealDto } from "../../meals/dto/create-meal.dto";
import { UpdateMealDto } from "../../meals/dto/update-meal.dto";

// repository
import { MealsRepository } from "../meals-repository";
import { PrismaService } from "../../lib/prisma.service";


@Injectable()
export class PrismaMealsRepository implements MealsRepository {
    
    constructor(private readonly prismaService: PrismaService){}

    async create(data: CreateMealDto){
        const createMeal = await this.prismaService.meals.create({
            data: data
        })

        return createMeal
    }
    
    async update(id: string, userId: string, data: UpdateMealDto){
        const updateMeal = await this.prismaService.meals.update({
            data: data,
            where: {
                id: id,
                userId: userId
            },
        })
        return updateMeal
    }

    async delete(id: string, userId: string,) {
        const updateMeal = await this.prismaService.meals.update({
            data: {
                deletedAt: new Date()
            },
            where: {
                id: id,
                userId: userId
            },
            select: {
                id: true
            }
        })

        if(updateMeal.id) {
            return true
        }

        return false
    }

    async findAll(userId: string) {
        const listAll = await this.prismaService.meals.findMany({
            where: {
                userId: userId
            }
        })

        return listAll
    }

    async findUnique(id: string, userId: string) {
        const find = await this.prismaService.meals.findUnique({
            where: {
                id: id,
                userId: userId
            }
        })

        return find
    }

}