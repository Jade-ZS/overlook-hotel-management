import { getRoomByDate } from './customer-get-room';
import { getTotalSpending } from './customer-dashboard';

const getDateToday = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayFormatted = today.replaceAll('-', '/');
  return todayFormatted;
};

const getAvailableRoomsToday = (bookings, rooms) => {
  const today = getDateToday();
  const availableRooms = getRoomByDate(today, bookings, rooms);
  return availableRooms;
};

const getOccupiedRoomsToday = (bookings, rooms) => {
  const availableRooms = getAvailableRoomsToday(bookings, rooms);
  const occupiedRooms = rooms.filter(room => !availableRooms.includes(room));
  return occupiedRooms;
};

const getBookingsToday = (bookings) => {
  const today = getDateToday();
  return bookings.filter(booking => booking.date === today);
};

const getRevenueToday = (bookings, rooms) => {
  const bookingsToday = getBookingsToday(bookings);
  const revenue = getTotalSpending(bookingsToday, rooms);
  return revenue;
};

const getOccupancyRateToday = (bookings, rooms) => {
  const availableRooms = getAvailableRoomsToday(bookings, rooms);
  const percent = 100 * (rooms.length - availableRooms.length) / rooms.length;
  return `${percent}%`;
}

export { 
  getDateToday, 
  getAvailableRoomsToday, 
  getOccupiedRoomsToday, 
  getBookingsToday, 
  getRevenueToday, 
  getOccupancyRateToday 
};

