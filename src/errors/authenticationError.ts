export default class AuthenticationError extends Error {

    statusCode: number;
    title: string;

    constructor(message: string) {
        super(message);
        this.statusCode = 401;
        this.title = "Unauthenticated"
    }
}