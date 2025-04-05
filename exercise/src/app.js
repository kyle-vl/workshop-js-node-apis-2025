import express from "express";
import cors from "cors";
import morgan from "morgan";
import testRouter from "./routes/test-routes.js"
import contactRouter from "./routes/contacts-routes.js"

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// TODO Create the Express server
const app = express();                   // Create app object

// TODO Configure middleware with app.use() (CORS support, JSON parsing support, static files support)
app.use(express.json());                // JSON parsing - allows requests in JSON to be parsed
app.use(express.static("public"));      // Static files - serve files in directory
app.use(cors());                        // CORS - server can be fetched outside of domain
app.use(morgan("dev"));                 // Morgan - logs useful debugging information

// TODO Your application routes here
app.use("/api/test", testRouter);
app.use("/api/contacts", contactRouter);

// TODO Start the server
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
