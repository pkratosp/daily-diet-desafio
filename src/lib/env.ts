import 'dotenv/config'
import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number(),
    HOST: z.string(),
    SECRET_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error(_env.error.format())
    throw new Error('❌❌ Variaveis de ambiente invalidas')
}

export const env = _env.data