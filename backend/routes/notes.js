const express = require("express");
require('dotenv').config();
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Internal error occuring while fetching the notes.", error);
        res.status(500).send("Internal error occurring while fetching notes");
    }

})
// ROUTE 2: Adding a new note using: POST "/api/notes/addnote". Login required.
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Desciption must have min 5 characters.").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error("Internal error occuring while adding note:", error);
        res.status(500).send("Internal error occurring while adding note.");
    }
})
// ROUTE 3: Updating a new note using: PUT "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found.");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed.");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error("Internal error occuring while updating note:", error);
        res.status(500).send("Internal error occurring while updating note");
    }
})
// ROUTE 4: Adding a new note using: PUT "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    // Find the note to be deleted and delete it
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found.");
        }
        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed.");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted.", note: note });
    } catch (error) {
        console.error("Internal error occuring while deleting note:", error);
        res.status(500).send("Internal error occurring while deleting note");
    }
})
module.exports = router;