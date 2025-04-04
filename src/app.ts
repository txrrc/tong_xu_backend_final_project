import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from "express";
import { Server } from "http";

// Import Hero routes
import heroRoutes from "../src/api/v1/routes/heroRoutes";
// Import Monster routes
import monsterRoutes from "../src/api/v1/routes/monsterRoutes";
// Import affiliation routes
import affiliationRoutes from "../src/api/v1/routes/affiliationRoutes";

// Import Swagger
import setupSwagger from "../config/swagger";

// Initialize Express app
const app: Express = express();

// Define the route
app.get("/", (req, res) =>{
    res.send("Hello, World!");
});

app.get("/health", (req, res) => {
    res.send("Server is healthy.")
});

// modular route for heroes
app.use("/api/v1/heroes", heroRoutes);
// modular route for monsters
app.use("/api/v1/monsters", monsterRoutes);
// modular route for affiliation
app.use("/api/v1/affiliation", affiliationRoutes);

setupSwagger(app);

// Start the server
let server: Server | null = null;
if (process.env.NODE_ENV !== "test") {
    const PORT: string | 3000 = process.env.PORT || 3000;
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// export the app and server for testing
export { app, server};