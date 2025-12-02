export default interface CreateCandidateDto {
    idCard: number;
    name: string;
    party?: string | null;
}