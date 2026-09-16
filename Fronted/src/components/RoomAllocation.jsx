import React, { useState } from 'react';
import './RoomAllocation.css';

const RoomAllocation = ({ onBack }) => {
  const [selectedFloor, setSelectedFloor] = useState('all');

  const rooms = [
    { id: 101, floor: 'floor1', room: 'Room 101', type: 'Single Bed (AC)', available: '1 Bed Left', fee: '₹ 25,000 / Sem', amenities: ['AC', 'Wi-Fi', 'Attached Washroom'] },
    { id: 102, floor: 'floor1', room: 'Room 102', type: 'Double Sharing (Non-AC)', available: '2 Beds Left', fee: '₹ 18,000 / Sem', amenities: ['Wi-Fi', 'Study Table', 'Balcony'] },
    { id: 201, floor: 'floor2', room: 'Room 201', type: 'Single Bed (AC)', available: 'Full', fee: '₹ 25,000 / Sem', amenities: ['AC', 'Wi-Fi', 'Geyser'] },
    { id: 205, floor: 'floor2', room: 'Room 205', type: 'Double Sharing (AC)', available: '1 Bed Left', fee: '₹ 21,000 / Sem', amenities: ['AC', 'Wi-Fi', 'Balcony'] },
    { id: 302, floor: 'floor3', room: 'Room 302', type: 'Triple Sharing (Non-AC)', available: '3 Beds Left', fee: '₹ 15,000 / Sem', amenities: ['Wi-Fi', 'Wardrobe', 'Study Lamp'] },
    { id: 306, floor: 'floor3', room: 'Room 306', type: 'Double Sharing (Non-AC)', available: '1 Bed Left', fee: '₹ 18,000 / Sem', amenities: ['Wi-Fi', 'Balcony'] },
  ];

  const filteredRooms = selectedFloor === 'all' ? rooms : rooms.filter(r => r.floor === selectedFloor);

  return (
    <div className="room-allocation-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold text-dark mb-1">🛏️ Apply for Room Allocation</h3>
          <p className="text-muted small mb-0">Browse available rooms and select your preferred sharing type</p>
        </div>
        {onBack && (
          <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={onBack}>
            ← Back to Dashboard
          </button>
        )}
      </div>

      {/* Floor Filter Tabs */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={selectedFloor === 'all' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'} 
          onClick={() => setSelectedFloor('all')}
        >
          All Floors
        </button>
        <button 
          className={selectedFloor === 'floor1' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'} 
          onClick={() => setSelectedFloor('floor1')}
        >
          1st Floor
        </button>
        <button 
          className={selectedFloor === 'floor2' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'} 
          onClick={() => setSelectedFloor('floor2')}
        >
          2nd Floor
        </button>
        <button 
          className={selectedFloor === 'floor3' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'} 
          onClick={() => setSelectedFloor('floor3')}
        >
          3rd Floor
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="row g-3">
        {filteredRooms.map((room) => (
          <div key={room.id} className="col-12 col-md-6 col-lg-4">
            <div className="room-card-item h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0 text-dark">{room.room}</h5>
                <span className={room.available === 'Full' ? 'badge-full' : 'badge-available'}>
                  {room.available}
                </span>
              </div>
              <p className="text-muted small mb-2">{room.type}</p>

              {/* Amenities */}
              <div className="mb-3 d-flex flex-wrap gap-1">
                {room.amenities.map((amenity, idx) => (
                  <span key={idx} className="badge bg-light text-secondary border">
                    ✓ {amenity}
                  </span>
                ))}
              </div>

              {/* Fee & Action */}
              <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                <span className="fw-bold text-primary">{room.fee}</span>
                <button 
                  className="btn btn-primary btn-sm rounded-3 px-3" 
                  disabled={room.available === 'Full'}
                  onClick={() => alert('Room application submitted for ' + room.room)}
                >
                  {room.available === 'Full' ? 'Full' : 'Apply'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAllocation;
