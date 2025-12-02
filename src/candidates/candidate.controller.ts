import { Request, Response } from "express"
import candidateService from "./candidate.service"
import CreateCandidateDto from "./dtos/createCandidateDto";
import candidateSchema from "./candidate.schema";

const getAll = async (req: Request, res: Response) => {
    const { page = "1", limit = "10", party, name, sort = "id", order = "asc" } = req.query;

    const candidates = await candidateService.findAll(page, limit, party, name, sort, order);
    res.status(200).json(candidates);
}

const getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const candidate = await candidateService.findById(id);
    res.status(200).json(candidate);
}

const create = async (req: Request, res: Response) => {
    const candidate = candidateSchema.parse(req.body)
    const createdCandidate = await candidateService.create(candidate);
    res.status(201).json(createdCandidate);
}

const deleteById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    await candidateService.delete(id);
    res.status(204).end();
}

export { getAll, getById, create, deleteById };