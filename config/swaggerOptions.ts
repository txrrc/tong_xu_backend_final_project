import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "One Punch Man API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Employee application.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                Hero: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "9",
                    },
                    name: {
                      type: "string",
                      example: "Tanktop Vegeterian",
                    },
                    rank: {
                      type: "string",
                      example: "A",
                    },
                    ability: {
                      type: "string",
                      example: "Tanktop Smash",
                    },
                  },
                  required: ["id", "name", "rank", "ability"],
                },
                Monster: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "20",
                    },
                    name: {
                      type: "string",
                      example: "King of sea",
                    },
                    threatLevel: {
                      type: "string",
                      example: "Ghost",
                    },
                    ability: {
                      type: "string",
                      example: "Acid",
                    },
                    defeatHistory: {
                      type: "string",
                      example: "Killed by Saitama",
                    },
                  },
                  required: ["id", "name", "threatLevel", "ability","defeatHistory"],
                },
                Affiliation: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "3",
                    },
                    name: {
                      type: "string",
                      example: "Family of monster",
                    },
                    background: {
                      type: "string",
                      example: "An association under city Z",
                    },
                  },
                  required: ["id", "name", "background"],
                },
              },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};