import { config } from "dotenv";
import { z } from "zod";

// if(process.env.NODE_ENV === 'test') {
//     config({ path: '.env.test' })
// }else {
//     config({ path: '.env' })
// }
config({ path: '.env' })


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