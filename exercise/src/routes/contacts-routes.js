import { Router } from "express";
import { retrieveContacts, createContact, retrieveContact } from "../data/contacts-dao.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allContacts = await retrieveContacts();
        console.log("Getting all contacts...");
        res.json(allContacts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
})

router.get('/:id', async (req, res) => {
    // Retrieve contact from ID passed in as URL parameter
    const id = req.params.id;
    const contact = await retrieveContact(id);
    console.log(`Searching for contact ID ${id}...`);

    // Return error if contact not in contacts list
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    // Return contact if found
    res.status(200).send(contact);
});

router.post('/', async (req, res) => {
    try {
        const contactWithID = await createContact(req.body);
        console.log(`Creating new contact ${req.body.name}...`);
        return res.status(201).send(contactWithID);
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
})

export default router;