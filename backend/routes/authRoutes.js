const express = require('express');
const router = express.Router();
const {
  register,
  login,
  studentTest,
  adminTest,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected test routes
router.get('/student-test', authMiddleware, roleMiddleware('student'), studentTest);
router.get('/admin-test', authMiddleware, roleMiddleware('admin'), adminTest);

module.exports = router;
