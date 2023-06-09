import { getRoomByDate } from './customer-get-room';
import { getTotalSpending } from './customer-dashboard';

const getDateToday = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayFormatted = today.replaceAll('-', '/');
  return todayFormatted;
};

const getOccupiedRoomsForDay = (date, bookings, rooms) => {
  const availableRooms = getRoomByDate(date, bookings, rooms);
  const occupiedRooms = rooms.filter(room => !availableRooms.includes(room));
  return occupiedRooms;
};

const getBookingsForDay = (date, bookings) => {
  return bookings.filter(booking => booking.date === date);
};

const getRevenueForDay = (date, bookings, rooms) => {
  const bookingsForDay = getBookingsForDay(date, bookings);
  const revenue = getTotalSpending(bookingsForDay, rooms);
  return revenue;
};

const getOccupancyRateForDay = (date, bookings, rooms) => {
  const availableRooms = getRoomByDate(date, bookings, rooms);
  const percent = 100 * (rooms.length - availableRooms.length) / rooms.length;
  return `${percent}%`;
}

export { 
  getDateToday, 
  getOccupiedRoomsForDay, 
  getBookingsForDay, 
  getRevenueForDay, 
  getOccupancyRateForDay 
};

