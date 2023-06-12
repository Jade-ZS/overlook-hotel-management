import './css/styles.css';
import './images/turing-logo.png';
import { 
  getDataByFetch, 
  addNewBooking, 
  deleteSingleBooking } from './api-calls';

// customer views
const roleChoiceView = document.querySelector('.role-choice-view');
const loginView = document.querySelector('.login-view');
const customerDashboard = document.querySelector('.customer-dashboard-view');
const myBookingsView = document.querySelector('.my-bookings-view');
const makeBookingView = document.querySelector('.book-a-room-view');
const roomDetailView = document.querySelector('.room-detail-view');
