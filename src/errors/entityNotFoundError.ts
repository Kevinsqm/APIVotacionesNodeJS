export default class EntityNotFoundError extends Error {

    statusCode: number;
    title: string;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
        this.title = "Resource Not Found"
    }
}