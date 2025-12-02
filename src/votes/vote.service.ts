import CreateVoteDto from "./dtos/createVoteDto";
import voterService from "../voters/voter.service";
import candidateService from "../candidates/candidate.service";
import InvalidEntityError from "../errors/invalidEntityError";
import prisma from "../config/database";

class VoteService {

    async getAll() {
        const votes = await prisma.vote.findMany({
            select: {
                id: true,
                voter: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                candidate: {
                    select: {
                        id: true,
                        name: true
                    }
                }


            }
        });
        return votes;
    }

    async create(vote: CreateVoteDto) {
        await this.validateVoter(vote.voterId);
        await this.validateCandidate(vote.candidateId);
        const createdVote = await prisma.vote.create({ data: vote });
        await voterService.updateVoterStatus(vote.voterId);
        await candidateService.increaseVotes(vote.candidateId);
        return createdVote;
    }

    private async validateVoter(voterId: number) {
        const voter = await voterService.findById(voterId);
        if (voter.hasVoted) throw new InvalidEntityError("The voter has already voted");
    }

    private async validateCandidate(candidateId: number) {
        await candidateService.findById(candidateId);
    }

}

export default new VoteService();