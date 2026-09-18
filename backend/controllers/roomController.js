const Room = require('../models/Room');
const User = require('../models/User');

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// @desc    Create a new room
// @route   POST /api/rooms
// @access  Private (Admin)
const createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      block,
      floor,
      type,
      capacity,
      occupied,
      price,
      status,
      amenities,
      description,
      images,
    } = req.body;

    // 1. Validate required fields
    if (!roomNumber || !block || !capacity || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide roomNumber, block, capacity, and price.',
      });
    }

    // 2. Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber: roomNumber.trim() });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: `Room with number '${roomNumber}' already exists.`,
      });
    }

    // 3. Instantiate and save new room
    const room = new Room({
      roomNumber: roomNumber.trim(),
      block: block.trim(),
      floor: floor !== undefined ? floor : 1,
      type: type || 'Double',
      capacity: Number(capacity),
      occupied: occupied !== undefined ? Number(occupied) : 0,
      price: Number(price),
      status: status || 'Available',
      amenities: Array.isArray(amenities) ? amenities : [],
      description: description || '',
      images: Array.isArray(images) ? images : [],
      createdBy: req.user ? req.user.id : null,
    });

    await room.save();

    return res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room,
    });
  } catch (error) {
    console.error('Create Room Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while creating room.',
    });
  }
};

// @desc    Get all rooms with filtering and pagination
// @route   GET /api/rooms
// @access  Public / Authenticated
const getAllRooms = async (req, res) => {
  try {
    const { status, type, block, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by block
    if (block) {
      query.block = { $regex: block, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search by roomNumber or description
    if (search) {
      query.$or = [
        { roomNumber: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination calculations
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalRooms = await Room.countDocuments(query);
    const rooms = await Room.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: rooms.length,
      totalRooms,
      totalPages: Math.ceil(totalRooms / limitNum) || 1,
      currentPage: pageNum,
      data: rooms,
    });
  } catch (error) {
    console.error('Get All Rooms Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching rooms.',
    });
  }
};

// @desc    Get single room details by ID
// @route   GET /api/rooms/:id
// @access  Public / Authenticated
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format.',
      });
    }

    const room = await Room.findById(id).populate('createdBy', 'name email');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Get Room By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching room details.',
    });
  }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private (Admin)
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format.',
      });
    }

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found.',
      });
    }

    // Check roomNumber uniqueness if roomNumber is being changed
    if (req.body.roomNumber && req.body.roomNumber.trim() !== room.roomNumber) {
      const existingRoom = await Room.findOne({ roomNumber: req.body.roomNumber.trim() });
      if (existingRoom) {
        return res.status(400).json({
          success: false,
          message: `Room number '${req.body.roomNumber}' is already in use.`,
        });
      }
      room.roomNumber = req.body.roomNumber.trim();
    }

    // Update allowed fields
    const updatableFields = [
      'block',
      'floor',
      'type',
      'capacity',
      'occupied',
      'price',
      'status',
      'amenities',
      'description',
      'images',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        room[field] = req.body[field];
      }
    });

    await room.save();

    return res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: room,
    });
  } catch (error) {
    console.error('Update Room Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while updating room.',
    });
  }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private (Admin)
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format.',
      });
    }

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found.',
      });
    }

    await Room.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      deletedRoomId: id,
    });
  } catch (error) {
    console.error('Delete Room Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting room.',
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
