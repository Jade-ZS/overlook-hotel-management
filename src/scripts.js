import './css/styles.css';
import './images/turing-logo.png';
import { 
  getDataByFetch, 
  addNewBooking, 
  deleteSingleBooking } from './api-calls';
import { 
  clearView, 
  changeView,

} from './domUpdates';

// import {
//   displayRoleChoice,
//   displayLogIn,
//   displayCustomerDashboard,
//   displayMyBookings,
//   displayMakeBookings,
//   displayRoomDetail
// } from './display-customer-views'

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
const backToRolesButtonconst = document.querySelector('#back-to-roles');
const loginButton = document.querySelector('#login-button');

// dashboard boxes
const toMakeBookingBox = document.querySelector('.book-room');
const toMyBookingsBox = document.querySelector('.my-booking');
const toSpendingBox = document.querySelector('.spending');

// form
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// event listeners
customerButton.addEventListener('click', displayLogIn());

// event handlers

const displayRoleChoice = () => {
  const itemsToHide = [loginView, customerDashboard, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [roleChoiceView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayLogIn = () => {
  const itemsToHide = [roleChoiceView, customerDashboard, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [loginView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayCustomerDashboard = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [customerDashboard];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
  
};

const displayMyBookings = () => {
  const itemsToHide = [roleChoiceView, loginView, customerDashboard, makeBookingView, roomDetailView];
  const itemsToShow = [myBookingsView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayMakeBookings = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, customerDashboard, roomDetailView];
  const itemsToShow = [makeBookingView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayRoomDetail = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView, customerDashboard];
  const itemsToShow = [roomDetailView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};


