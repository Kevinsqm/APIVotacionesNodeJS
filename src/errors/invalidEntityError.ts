export default class InvalidEntityError extends Error {

    statusCode: number;
    title: string;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.title = "Invalid Entity"
    }
}