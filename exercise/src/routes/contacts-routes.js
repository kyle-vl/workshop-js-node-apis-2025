import { Router } from "express";
import { createContact, retrieveContact } from "../data/contacts-dao.js";

const router = Router();

router.get('/', async (req, res) => {
    const contact = await retrieveContact("5f90d372-7bdf-4b39-b621-cf6d3cd975f4");
    res.send(contact);
});

router.post('/', async (req, res) => {
    const contactWithID = await createContact(req.body);
    return res.status(201).send(contactWithID);
})

export default router;