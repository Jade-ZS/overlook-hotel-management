import './css/styles.css';
import './images/turing-logo.png';
import { 
  getDataByFetch, 
  addNewBooking, 
} from './api-calls';

import {
  getTotalSpending
} from './customer-dashboard';

import {
  getChosenDate,
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displaySearchResult,
  renderLoginCheck,
  renderUserInfo,

} from './domUpdates'

// customer views
const main = document.querySelector('main');
const roleChoiceView = document.querySelector('.role-choice-view');
const loginView = document.querySelector('.login-view');
const customerDashboard = document.querySelector('.customer-dashboard-view');
const myBookingsView = document.querySelector('.my-bookings-view');
const makeBookingView = document.querySelector('.book-a-room-view');

// buttons
const customerButton = document.querySelector('#customer-button');
const managerButton = document.querySelector('#manager-button');
const backToRolesButton = document.querySelector('#back-to-roles');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#log-out-button');
const homeButton = document.querySelector('#home-button');
const myBookingsViewButton = document.querySelector('#my-bookings-view-button');
const makeBookingViewButton = document.querySelector('#book-a-room-view-button');

// boxes
const sidebar = document.querySelector('.sidebar');
const toMakeBookingBox = document.querySelector('.book-room');
const toMyBookingsBox = document.querySelector('.my-booking');
const spendingBox = document.querySelector('.spending');
const userInfo = document.querySelector('.user-info');

// form
const loginForm = document.querySelector('.login-view form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const invalidUserText = document.querySelector('#invalid-username-text');
const invalidPasswordText = document.querySelector('#invalid-password-text');

let userData;
let roomsData;
let bookingsData;
let currentUser;
let spending;

const start = () => {
  Promise.all([getDataByFetch('customers'), getDataByFetch('rooms'), getDataByFetch('bookings')])
  .then((data) => {
    userData = data[0].customers;
    roomsData = data[1].rooms;
    bookingsData = data[2].bookings;

    spending = getTotalSpending(bookingsData, roomsData);
  });
};

// event listeners
window.addEventListener('load', start);

customerButton.addEventListener('click', e => {
  displayLogIn();
});

backToRolesButton.addEventListener('click', e => {
  displayRoleChoice();
});

logoutButton.addEventListener('click', e => {
  displayRoleChoice();
});

loginButton.addEventListener('click', e => {
  e.preventDefault();
  if (loginForm.checkValidity() && renderLoginCheck(userData)) {
    displayCustomerDashboard(spending);
    currentUser = userData.find(user => user.id === parseInt(usernameInput.value.substring(8)));
  } 
  renderLoginCheck(userData);
  spending = getTotalSpending(bookingsData, roomsData);
  renderUserInfo(currentUser);
});

toMyBookingsBox.addEventListener('click', e => {
  displayMyBookings(bookingsData, roomsData, currentUser);
});

toMakeBookingBox.addEventListener('click', e => {
  displayMakeBookings(e, bookingsData, roomsData);
});

homeButton.addEventListener('click', e => {
  displayCustomerDashboard(spending);
});

myBookingsViewButton.addEventListener('click', e => {
  displayMyBookings(bookingsData, roomsData, currentUser);
});

makeBookingViewButton.addEventListener('click', e => {
  displayMakeBookings(e, bookingsData, roomsData);
});

makeBookingView.addEventListener('click', e => {
  if (e.target.id === "search-rooms-button") {
    e.preventDefault();
    displaySearchResult(bookingsData, roomsData);
  }

  if (e.target.classList.contains('book-this-room-button')) {
    e.preventDefault();
    let date = getChosenDate();
    let userID = currentUser.id;
    let roomNumber = parseInt(e.target.id);
    
    let bookingToAdd = {
      userID, 
      date, 
      roomNumber};
    
    if (date && date.length) {
      addNewBooking(bookingToAdd);
      spending += parseInt(roomsData.find(room => room.number === roomNumber).costPerNight);
      e.target.disabled = true;
      start();
      setTimeout(() => alert('You\'ve successfully booked this room!'), 1000);
    }

  }
});

export {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  sidebar,
  usernameInput,
  passwordInput,
  invalidPasswordText,
  invalidUserText,
  homeButton,
  myBookingsViewButton,
  makeBookingViewButton,
  spendingBox,
  userInfo,
  main
};
