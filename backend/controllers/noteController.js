const Note = require('../models/noteModel');

// Get all notes for a user
const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content, folder } = req.body;
  
  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide both title and content');
  }

  const note = new Note({
    user: req.user._id,
    title,
    content,
    folder,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// Update a note
const updateNote = async (req, res) => {
  const { title, content, folder } = req.body;
  const note = await Note.findById(req.params.id);

  if (note) {
    note.title = title;
    note.content = content;
    note.folder = folder;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    await note.remove();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
