import express from "express";
import cors from "cors";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// TODO Create the Express server
const app = express();      // create app object
app.use(express.json());    // activate json

// TODO Configure middleware with app.use() (CORS support, JSON parsing support, static files support)

// TODO Your application routes here

// req (request) == data in
// res (response) == data out
app.get("/", (req, res) => {
    return res.json(({ message: "Hello, world!" }));
});

// query request
app.get("/test", (req, res) => {
    const name = req.query.name;
    res.send(`Your name is ${name}`);
});

// parameter request
app.get("/test2/:param2", (req, res) => {
    const id = req.params.param2
    res.send(`You've accessed resource via path param ${id}`)
});

app.post("/test3", (req, res) => {
    console.log(`This is the data from the client: ${req.body}`);
    res.sendStatus(201);        // return success code
})

// TODO Start the server
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
