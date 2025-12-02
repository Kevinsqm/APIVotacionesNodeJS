import prisma from "../config/database"
import EntityNotFoundError from "../errors/entityNotFoundError";
import InvalidEntityError from "../errors/invalidEntityError";
import CreateCandidateDto from "./dtos/createCandidateDto";
import voterService from "../voters/voter.service";

class CandidateService {

    async findAll(page: any, limit: any, party: any, name: any, sort: any, order: any) {
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        const where: any = {};

        if (name) {
            where.name = { equals: String(name), mode: "insensitive" };
        }

        if (party) {
            where.party = { equals: String(party), mode: "insensitive" };
        }

        const total = await prisma.candidate.count({ where });
        const candidates = await prisma.candidate.findMany({
            where,
            orderBy: { [String(sort)]: order === "desc" ? "desc" : "asc" },
            skip,
            take: pageSize
        });

        return candidates;

        // return await prisma.candidate.findMany();
    }

    async findById(id: number) {
        const candidate = await prisma.candidate.findUnique({ where: { id } });

        if (!candidate) throw new EntityNotFoundError(`Candidate with id ${id} not found`)

        return candidate;
    }

    async existsByIdCard(idCard: number) {
        const candidate = await prisma.candidate.findUnique({ where: { idCard } });
        return candidate ? true : false;
    }

    async create(candidate: CreateCandidateDto) {
        const { idCard } = candidate;

        if (await voterService.existsIdCard(idCard))
            throw new InvalidEntityError(`The candidate is already registered as a voter`);
        if (await this.existsByIdCard(idCard))
            throw new InvalidEntityError(`There is already a candidate registered with this ID Card`);

        return await prisma.candidate.create({ data: candidate });
    }

    async delete(id: number) {
        const candidate = await prisma.candidate.findUnique({ where: { id } });

        if (!candidate) throw new EntityNotFoundError(`Candidate with id ${id} not found`)

        await prisma.candidate.delete({ where: { id } });
    }

    async increaseVotes(id: number) {
        const candidate = await this.findById(id);
        await prisma.candidate.update({
            where: { id },
            data: { votes: candidate.votes + 1 }
        })
    }
}

export default new CandidateService();