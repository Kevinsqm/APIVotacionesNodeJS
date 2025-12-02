import { Router } from 'express';
import candidateRouter from './candidates/candidate.routes';
import voterRouter from './voters/voter.routes';
import voteRouter from './votes/vote.routes';
import authRouter from './auth/auth.routes';

const router = Router();

router.use('/candidates', candidateRouter);
router.use("/voters", voterRouter);
router.use("/votes", voteRouter);
router.use("/auth", authRouter)


export default router;