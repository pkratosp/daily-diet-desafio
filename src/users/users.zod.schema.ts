import { z } from "zod";

export const schemaCreateUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})