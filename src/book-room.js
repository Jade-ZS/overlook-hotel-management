/**
 * => matchRoomById
 * 
 * => getRoomByDate
 * arguments: date
 * return: available rooms
 * 
 * => getRoomByType
 * arguments: room type
 * return: available rooms
 * 
 * => return apology message
 * 
 * => return redirection message
 */

const matchItem = (id, items, key) => items.find(ele => ele[key] === id);

// const matchUser = (userId, customers) => customers.find(customer => customer.id === userId);
// const matchRoom = (roomNumber, rooms) => rooms.find(room => room.number === roomNumber);

const getRoomByDate = (date, bookings, rooms) => {
  let conflictedBookings = bookings.filter(booking => booking.date === date);
  if (conflictedBookings.length === bookings.length) {
    return 'We are sorry that no room is available for the date you selected. Please select a different date.'
  } else {
    return rooms.filter(room => !matchItem(room.number, conflictedBookings, 'roomNumber'));
  }
};

const getRoomByType = (type, availableRooms) => {
  let filteredResult = availableRooms.filter(room => room.roomType === type);
  if (!filteredResult.length) {
    return 'We are sorry that we do not have this room type available on the date you chose. Please try a different room type.'
  } else {
    return filteredResult;
  }
}; 
