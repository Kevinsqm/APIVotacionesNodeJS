import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import cors from "cors";
import { ZodError } from "zod";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).json({
            status: 400,
            title: "Validation Error",
            errors: err.issues.map(issue => ({
                field: issue.path,
                message: issue.message
            }))
        })
    }
    res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        title: err.title,
        message: err.message,
        instance: req.url
    })
})

export default app;
