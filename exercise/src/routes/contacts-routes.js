import { Router } from "express";
import { retrieveContacts, createContact, retrieveContact, deleteContact, updateContact } from "../data/contacts-dao.js";

const router = Router();

router.get('/', async (req, res) => {
    // Retrieve contacts list
    try {
        const allContacts = await retrieveContacts();
        console.log("Getting all contacts...");
        res.json(allContacts);
        // Return internal server error if failed to retrieve contacts
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
})

router.get('/:id', async (req, res) => {
    // Retrieve contact from ID passed in as URL parameter
    const id = req.params.id;
    const contact = await retrieveContact(id);
    console.log(`Searching for contact ID ${id}...`);

    // Return not found error if contact not in contacts list
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    // Return contact if found
    res.status(200).send(contact);
});

router.post('/', async (req, res) => {
    // Create contact name and add to contacts list
    try {
        const contactWithID = await createContact(req.body);
        console.log(`Creating new contact ${req.body.name}...`);
        return res.status(201).send(contactWithID);
        // Return bad request error if name already exists or if name key missing
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
})

router.delete('/:id', async (req, res) => {
    // Retrieve contact from ID passed in as URL parameter
    const id = req.params.id;
    const contact = await retrieveContact(id);
    console.log(`Searching for contact ID ${id}...`);

    // Return not found error if contact not in contacts list
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    // If contact found, delete and return success
    console.log(`Removing ${contact.name} from contact list...`);
    await deleteContact(id);
    return res.status(204).send();
})

router.patch('/:id', async (req, res) => {
    // Retrieve contact from ID passed in as URL parameter
    const id = req.params.id;

    // Retrieve contact updates from request body
    const contactUpdates = req.body;

    try {
        const success = await updateContact(id, contactUpdates);

        if (!success) {
            // Return not found error if contact not in contacts list
            return res.status(404).json({ message: "Contact not found" });
        }
        // If contact found, update and return success
        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        // Return bad request error if there's a validation error
        res.status(400).json({ error: error.toString() });
    }
})

export default router;