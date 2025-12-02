import { z } from "zod";

const candidateSchema = z.object({
    idCard: z.number().int().min(10000),
    name: z.string().min(1),
    party: z.string().nullable()
})

export default candidateSchema;