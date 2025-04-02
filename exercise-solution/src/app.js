import express from "express";
import cors from "cors";

import {
    createContact,
    deleteContact,
    retrieveContacts,
    updateContact,
} from "./data/contacts-dao.js";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// TODO Create the Express server
const app = express();

// TODO Configure middleware with app.use() (CORS support, JSON parsing support, static files support)
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// TODO Your application routes here


/**
 * GET /api/contacts: Retrieves a JSON array of all contacts, with a 200 OK response.
 */
app.get("/contacts", async (req, res) => {
    return res.json(await retrieveContacts());
});

/**
 * POST /api/contacts: Creates a new contact with the info in the request body.
 * - If successful, returns a 201 Created response with the new contact as JSON, and the contact's id in the Location header.
 * - Returns a 422 error if trying to create a contact without a name, or with a non-unique name.
 */
app.post("/contacts", async (req, res) => {
    console.log(req.body);
    try {
        const contact = await createContact(req.body);
        return res.status(201).location(`/contacts/${contact._id}`).json(contact);
    } catch (err) {
        return res.status(422).send(err);
    }
});

/**
 * PATCH /api/contacts/:id: Updates one or more properties of the contact with the given id (in the path param).
 * - If a contact with that id doesn't exist, returns a 404 response.
 * - If trying to update a contact's name to a non-unique name, returns a 422 response.
 * - Otherwise, returns a 204 No Content success response.
 */
app.patch("/contacts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await updateContact(id, req.body);
        if (!updated) return res.status(404).send(`Contact ${id} not found`);
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send(err);
    }
});

/**
 * DELETE /api/contacts/:id: Deletes the contact with the given id, if it exist. Returns a 204 response
 * either way.
 */
app.delete("/contacts/:id", async (req, res) => {
    const { id } = req.params;

    await deleteContact(id);
    return res.sendStatus(204);
});



// TODO Start the server
app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
