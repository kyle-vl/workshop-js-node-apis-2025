import { Router } from "express";

const router = Router();

// req (request) == data in
// res (response) == data out
router.get("/", (req, res) => {
    return res.json(({ message: "Hello, world!" }));
});

// query request
router.get("/test", (req, res) => {
    const name = req.query.name;
    res.send(`Your name is ${name}`);
});

// parameter request
router.get("/test2/:param2", (req, res) => {
    const id = req.params.param2
    res.send(`You've accessed resource via path param ${id}`)
});

router.post("/test3", (req, res) => {
    console.log("This is the data from the client:", req.body);
    res.sendStatus(201);        // return success code
})

export default router;