import prisma from "../config/database";
import EntityNotFoundError from "../errors/entityNotFoundError";
import InvalidEntityError from "../errors/invalidEntityError";
import CreateVoterDto from "./dtos/createVoterDto";
import candidateService from "../candidates/candidate.service";

class VoterService {

    async findAll(page: any, limit: any, name: any, email: any, hasVoted: any, sort: any, order: any) {
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        const where: any = {};

        if (name) {
            where.name = { equals: String(name), mode: "insensitive" };
        }

        if (email) {
            where.email = { equals: String(email), mode: "insensitive" };
        }

        if (hasVoted) {
            where.hasVoted = { equals: Boolean(hasVoted), mode: "insensitive" };
        }

        const total = await prisma.voter.count({ where });
        const voters = await prisma.voter.findMany({
            where,
            orderBy: { [String(sort)]: order === "desc" ? "desc" : "asc" },
            skip,
            take: pageSize
        });

        return voters;
    }

    async findById(id: number) {
        const voter = await prisma.voter.findUnique({ where: { id } });

        if (!voter) throw new EntityNotFoundError(`Voter with id ${id} not found`)

        return voter;
    }

    async existsIdCard(idCard: number) {
        const voter = await prisma.voter.findUnique({ where: { idCard } });
        return voter ? true : false;
    }

    async existsByEmail(email: string) {
        const voter = await prisma.voter.findUnique({ where: { email } });
        return voter ? true : false;
    }

    async create(voter: CreateVoterDto) {
        const { idCard, email } = voter;

        if (await candidateService.existsByIdCard(idCard))
            throw new InvalidEntityError("The voter is already registered as a candidate")
        if (await this.existsIdCard(idCard))
            throw new InvalidEntityError("There is already a voter registered with this ID Card")
        if (await this.existsByEmail(email))
            throw new InvalidEntityError("There is already a voter registered with this email")

        return await prisma.voter.create({ data: voter })
    }

    async delete(id: number) {
        const voter = await prisma.voter.findUnique({ where: { id } });

        if (!voter) throw new EntityNotFoundError(`Voter with id ${id} not found`)

        await prisma.voter.delete({ where: { id } })
    }

    async updateVoterStatus(id: number) {
        const voter = await this.findById(id);
        await prisma.voter.update({
            where: { id },
            data: { hasVoted: true }
        });
    }
}

export default new VoterService();