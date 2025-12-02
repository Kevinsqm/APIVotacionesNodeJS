import { email, z } from "zod"

const voterSchema = z.object({
    idCard: z.number().int().min(10000),
    name: z.string().min(1),
    email: z.email()
});

export default voterSchema;