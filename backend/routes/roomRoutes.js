const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public / open endpoints (accessible by students and admin or guests)
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

// Protected Admin-only endpoints
router.post('/', authMiddleware, roleMiddleware('admin'), createRoom);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateRoom);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteRoom);

module.exports = router;
