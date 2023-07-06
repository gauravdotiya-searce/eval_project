const db = require("../models/db");

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await db.Note.findAll({ include: db.User }); //Eagerly load user details
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//Find notes belonging to a particular user by user_id
exports.getUserNotes = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const notes = await db.Note.findAll({ where: { user_id } });
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

exports.createNewNote = async (req, res, next) => {
  try {
    const { title, content, user_id } = req.body;
    if (user_id) {
      const note = await db.Note.create({ title, content, user_id });
      await note.save();
      return res.status(200).json({ message: "Note Saved Successfully!" });
    }
    throw new Error("No user id specified");
  } catch (error) {
    next(error);
  }
};

exports.updateExistingNote = async (req, res, next) => {
  try {
    const { user_id, note_id, title, content } = req.body;
    const note = await db.Note.findOne({ where: { note_id: note_id } }); //fetch note with note_id
    if (user_id === note.user_id) {
      //check if user modifying the note is the author of the note
      note.title = title || note.title;
      note.content = content || note.content;
      await db.Note.update(
        { title: note.title, content: note.content },
        { where: { user_id } }
      );
      return res.status(200).json({ message: "Updated Note Successfully!!" });
    }
    return res.status(500).json({ message: "user_id different from creator" });
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { note_id } = req.params;
    await db.Note.destroy({ where: { note_id } });
    return res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
