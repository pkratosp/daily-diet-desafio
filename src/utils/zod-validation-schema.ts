import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationSchemas {

    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            
            const parsedValue = this.schema.parse(value)

            return parsedValue

        } catch (error) {
            throw new BadRequestException({
                message: 'Bad request',
                error: error
            })
        }
    }

}