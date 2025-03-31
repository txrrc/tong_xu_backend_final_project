import express, { Express } from "express";
import { Server } from "http";

// Initialize Express app
const app: Express = express();

// Define the route
app.get("/", (req, res) =>{
    res.send("Hello, World!");
});

app.get("/health", (req, res) => {
    res.send("Server is healthy.")
});

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