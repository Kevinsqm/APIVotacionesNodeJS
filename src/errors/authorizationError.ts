export default class AuthorizationError extends Error {

    statusCode: number;
    title: string;

    constructor(message: string) {
        super(message);
        this.statusCode = 403;
        this.title = "Unauthorized"
    }
}