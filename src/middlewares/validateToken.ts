import { NextFunction, Request, Response } from "express";
import AuthorizationError from "../errors/authorizationError";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        throw new AuthorizationError("Token not provided");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            throw new AuthorizationError("Invalid token");

        next();
    })
}

export default validateToken;