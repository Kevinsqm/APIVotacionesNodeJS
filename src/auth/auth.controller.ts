import { Request, Response } from "express";
import userSchema from "./user.schema";
import authService from "./auth.service";

const register = async (req: Request, res: Response) => {
    const user = userSchema.parse(req.body);
    await authService.register(user);
    res.status(201).end();
}

const login = async (req: Request, res: Response) => {
    const user = userSchema.parse(req.body);
    const token = await authService.login(user);
    res.status(200).json({ token });
}

export { register, login };