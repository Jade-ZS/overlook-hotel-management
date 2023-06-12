import './css/styles.css';
import './images/turing-logo.png';
import { 
  getDataByFetch, 
  addNewBooking, 
  deleteSingleBooking } from './api-calls';


import {
  clearView, 
  changeView,
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displayRoomDetail
} from './domUpdates'

// customer views
const roleChoiceView = document.querySelector('.role-choice-view');
const loginView = document.querySelector('.login-view');
const customerDashboard = document.querySelector('.customer-dashboard-view');
const myBookingsView = document.querySelector('.my-bookings-view');
const makeBookingView = document.querySelector('.book-a-room-view');
const roomDetailView = document.querySelector('.room-detail-view');

// buttons
const customerButton = document.querySelector('#customer-button');
const managerButton = document.querySelector('#manager-button');
const backToRolesButton = document.querySelector('#back-to-roles');
const loginButton = document.querySelector('#login-button');

// dashboard boxes
const toMakeBookingBox = document.querySelector('.book-room');
const toMyBookingsBox = document.querySelector('.my-booking');
const toSpendingBox = document.querySelector('.spending');

// form
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// event listeners
customerButton.addEventListener('click', e => {
  displayLogIn();
});

backToRolesButton.addEventListener('click', e => {
  // TODO: add log in check call
  displayRoleChoice();
});

loginButton.addEventListener('click', e => {
  displayCustomerDashboard();
});

toMakeBookingBox.addEventListener('click', e => {
  displayMakeBookings();
});

toMyBookingsBox.addEventListener('click', e => {
  displayMyBookings();
});





export {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  roomDetailView,
  usernameInput,
  passwordInput,
};
