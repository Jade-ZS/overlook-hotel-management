// TO DO: matchItem is not used here, might need to remove this
// TO DO: related test in book-room-test.js
const matchItem = (id, key, items) => {
  if (typeof key !== 'string' || !Array.isArray(items)) {
    return 'matchItem Error: wrong input type';
  }

  let output = items.find(ele => ele[key] === id);
  output = output ? output : 'No matching item was found.'
  return output;
};

const checkDateFormat = date => {
  const numbers = date.split('/');
  if (numbers.length !== 3 && numbers.find(number => !parseInt(number))) {
    return false;
  } else {
    return true;
  }
};

const getRoomByDate = (date, bookings, rooms) => {
  if (typeof date !== 'string' || !checkDateFormat || !Array.isArray(bookings) || !Array.isArray(rooms)) {
    return 'getRoomByDate Error: wrong input type';
  }

  let conflictedBookings = bookings.filter(booking => booking.date === date);
  let unavailableRoomNumbers = conflictedBookings.map(conflictedBooking => conflictedBooking.roomNumber);
  let availableRooms = rooms.filter(room => !unavailableRoomNumbers.includes(room.number));

  if (availableRooms.length) {
    return availableRooms;
  } else {
    return 'We are sorry that no room is available for the date you selected. Please select a different date.'
  }
};

const getRoomByType = (type, availableRooms) => {
  if (typeof type !== 'string' || !Array.isArray(availableRooms)) {
    return 'getRoomByType Error: wrong input type';
  }

  let filteredResult = availableRooms.filter(room => room.roomType === type);
  if (!filteredResult.length) {
    return 'We are sorry that we do not have this room type available on the date you chose. Please try a different room type.'
  } else {
    return filteredResult;
  }
}; 

export { matchItem, checkDateFormat, getRoomByDate, getRoomByType };