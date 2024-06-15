import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDto extends PartialType(CreateMealDto) {
    name?: string
    description?: string
    isOnTheDiet?: boolean
}
