import voteService from "./vote.service";
import { Request, Response } from "express";
import voteSchema from "./vote.schema";
import statisticsService from "./statistics.service";

const getAll = async (req: Request, res: Response) => {
    const votes = await voteService.getAll();
    res.status(200).json(votes);
}

const create = async (req: Request, res: Response) => {
    const vote = voteSchema.parse(req.body);
    const createdVote = await voteService.create(vote);
    res.status(201).json(createdVote);
}

const getStatistics = async (req: Request, res: Response) => {
    const statistics = await statisticsService.getVotingStatistics();
    res.status(200).json(statistics);
}

export { getAll, create, getStatistics };