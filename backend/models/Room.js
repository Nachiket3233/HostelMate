const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      unique: true,
      trim: true,
    },
    block: {
      type: String,
      required: [true, 'Block name/number is required'],
      trim: true,
    },
    floor: {
      type: Number,
      default: 1,
      min: [0, 'Floor number cannot be negative'],
    },
    type: {
      type: String,
      enum: {
        values: ['Single', 'Double', 'Triple', 'Dormitory'],
        message: '{VALUE} is not a valid room type',
      },
      default: 'Double',
    },
    capacity: {
      type: Number,
      required: [true, 'Room capacity is required'],
      min: [1, 'Capacity must be at least 1 seat/bed'],
    },
    occupied: {
      type: Number,
      default: 0,
      min: [0, 'Occupied seats cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Room price is required'],
      min: [0, 'Price cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: ['Available', 'Occupied', 'Full', 'Maintenance'],
        message: '{VALUE} is not a valid room status',
      },
      default: 'Available',
    },
    amenities: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to auto-update status if occupied equals or exceeds capacity
roomSchema.pre('save', function () {
  if (this.occupied >= this.capacity && this.status !== 'Maintenance') {
    this.status = 'Full';
  } else if (this.occupied > 0 && this.occupied < this.capacity && this.status !== 'Maintenance') {
    this.status = 'Occupied';
  } else if (this.occupied === 0 && this.status !== 'Maintenance') {
    this.status = 'Available';
  }
});

module.exports = mongoose.model('Room', roomSchema);
