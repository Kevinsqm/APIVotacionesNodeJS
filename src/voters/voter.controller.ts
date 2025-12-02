import voterService from "./voter.service";
import { Request, Response } from "express";
import CreateVoterDto from "./dtos/createVoterDto";
import voterSchema from "./voter.schema";
import { any } from "zod";

const getAll = async (req: Request, res: Response) => {
    const { page = "1", limit = "10", name, email, hasVoted, sort = "id", order = "asc" } = req.query;
    const voters = await voterService.findAll(page, limit, name, email, hasVoted, sort, order);
    res.status(200).json(voters);
}

const getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const voter = await voterService.findById(id);
    res.status(200).json(voter);
}

const create = async (req: Request, res: Response) => {
    const voter = voterSchema.parse(req.body);
    const createdVoter = await voterService.create(voter);
    res.status(201).json(createdVoter);
}

const deleteById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    await voterService.delete(id);
    res.status(204).end();
}

export { getAll, getById, create, deleteById };