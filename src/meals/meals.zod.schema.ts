
import { z } from "zod";


export const createNewMeal = z.object({
    name: z.string(),
    description: z.string(),
    isOnTheDiet: z.boolean()
})

