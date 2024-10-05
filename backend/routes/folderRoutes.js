const express = require('express');
const { getFolders, createFolder, deleteFolder } = require('../controllers/folderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getFolders).post(protect, createFolder);
router.route('/:id').delete(protect, deleteFolder);

module.exports = router;
