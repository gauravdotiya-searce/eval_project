const router = require("express").Router();
const noteController = require("../controllers/note");

router.get("/all", noteController.getAllNotes); //GET all notes from all users

router.get("/user/:user_id", noteController.getUserNotes); // GET all notes from a specific user

router.post("/create", noteController.createNewNote); // POST create a new note

router.post("/modify", noteController.updateExistingNote); // POST modify an eisting note

router.get("/delete/:note_id", noteController.deleteNote); //GET delete and existing note

module.exports = router;
 