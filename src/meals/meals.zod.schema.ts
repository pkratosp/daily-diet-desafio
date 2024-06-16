
import { z } from "zod";


export const createNewMeal = z.object({
    name: z.string(),
    description: z.string(),
    isOnTheDiet: z.boolean()
})

export const schemaUpdateMeal = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isOnTheDiet: z.boolean().optional()
})