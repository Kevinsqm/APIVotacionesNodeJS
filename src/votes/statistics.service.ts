import voterService from "../voters/voter.service";
import prisma from "../config/database";

class StatisticsService {

    async getVotingStatistics() {
        // const totalVoters = (await voterService.findAll()).filter(voter => voter.hasVoted).length;
        const totalVoters = await prisma.voter.count({ where: { hasVoted: true } });
        const candidatesStatistics = (await prisma.candidate.findMany())
            .map(candidate => {
                return {
                    candidateId: candidate.id,
                    name: candidate.name,
                    votes: candidate.votes,
                    percentage: candidate.votes / totalVoters * 100
                }
            });

        return {
            totalVoters,
            candidatesStatistics
        }

    }
}

export default new StatisticsService();