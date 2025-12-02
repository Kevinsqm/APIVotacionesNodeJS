import UserDto from "./dtos/userDto";
import prisma from "../config/database";
import InvalidEntityError from "../errors/invalidEntityError";
import bcrypt from "bcrypt";
import EntityNotFoundError from "../errors/entityNotFoundError";
import AuthenticationError from "../errors/authenticationError";
import jwt from "jsonwebtoken"

class AuthService {

    async register(user: UserDto) {
        if (await this.exists(user.email))
            throw new InvalidEntityError("User already exists");

        user.password = await this.hashPassword(user.password);
        await prisma.user.create({ data: user });
    }

    async login(user: UserDto) {
        const userDb = await prisma.user.findUnique({ where: { email: user.email } });
        if (!userDb)
            throw new AuthenticationError("Invalid email or password");

        const passwordMatch = await bcrypt.compare(user.password, userDb.password);
        if (!passwordMatch)
            throw new AuthenticationError("Invalid email or password");

        const token = this.generateToken(userDb.email);
        return token;
    }

    async exists(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? true : false;
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    private generateToken(email: string) {
        const jwtSecret = process.env.JWT_SECRET || "secret";
        return jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
    }
}

export default new AuthService();