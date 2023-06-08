import { matchItem } from './book-room';

const getMyBookings = (userID, bookings) => {
  const myBookings = bookings.filter(booking => booking.userID === userID);
  if (!myBookings.length) {
    return 'You don\'t have any booking.';
  } else {
    return myBookings;
  }
};

const getTotalSpending = (myBookings, rooms) => {
  return myBookings.reduce((totalCost, currentBooking) => {
    let cost = matchItem(currentBooking.roomNumber, 'number', rooms).costPerNight;
    totalCost += cost;
    return totalCost;
  }, 0);
};

export { getMyBookings, getTotalSpending };