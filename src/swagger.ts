import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Sistema de Votaciones API",
            version: "1.0.0",
            description: "Documentación de la API del sistema de votaciones",
        },
    },
    apis: ["./**/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
