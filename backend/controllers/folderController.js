const Folder = require('../models/folderModel');

// Get all folders for a user
const getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user._id });
  res.json(folders);
};

// Create a new folder
const createFolder = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a folder name');
  }

  const folder = new Folder({
    user: req.user._id,
    name,
  });

  const createdFolder = await folder.save();
  res.status(201).json(createdFolder);
};

// Delete a folder
const deleteFolder = async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if (folder) {
    await folder.remove();
    res.json({ message: 'Folder removed' });
  } else {
    res.status(404);
    throw new Error('Folder not found');
  }
};

module.exports = { getFolders, createFolder, deleteFolder };
