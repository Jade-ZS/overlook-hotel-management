import { matchItem } from './customer-get-room';

const checkIfPast = (id, today, bookings) => {
  const bookingToDelete = matchItem(id, 'userID', bookings);
  const dateToDelete = bookingToDelete.date.split('/');
  today = today.split('/').map(ele => parseInt(ele));

  return dateToDelete.every((ele, index) => parseInt(ele) - today[index] >= 0);
};

export { checkIfPast };
