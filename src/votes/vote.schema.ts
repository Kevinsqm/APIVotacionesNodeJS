import { z } from "zod"

const voteSchema = z.object({
    candidateId: z.number().int().positive(),
    voterId: z.number().int().positive()
})

export default voteSchema;