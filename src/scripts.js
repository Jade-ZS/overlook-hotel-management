import './css/styles.css';
import './images/junior-suite-1-king.jpg';
import './images/junior-suite-1-queen.jpg';
import './images/junior-suite-2-king.jpg';
import './images/junior-suite-2-twin.jpg';
import './images/residential-suite-1-full.jpg';
import './images/residential-suite-1-queen.jpg';
import './images/residential-suite-1-twin.jpg';
import './images/residential-suite-2-queen.jpg';
import './images/single-room-1-full.jpg';
import './images/single-room-1-king.jpg';
import './images/single-room-1-queen.jpg';
import './images/single-room-1-twin.jpg';
import './images/single-room-2-full.jpg';
import './images/single-room-2-queen.jpg';
import './images/single-room-2-twin.jpg';
import './images/suite-1-queen.jpg';
import './images/suite-1-twin.jpg';
import './images/suite-2-full.jpg';
import './images/header.jpg';

import { 
  getDataByFetch, 
} from './api-calls';

import {
  getTotalSpending
} from './customer-dashboard';

import {
  login,
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displaySearchResult,
  getCurrentUser,
  makeNewBooking,
  renderCardCollection,
  displayExploreView,

} from './domUpdates'

// customer views
const main = document.querySelector('main');
const roleChoiceView = document.querySelector('.role-choice-view');
const loginView = document.querySelector('.login-view');
const customerDashboard = document.querySelector('.customer-dashboard-view');
const myBookingsView = document.querySelector('.my-bookings-view');
const makeBookingView = document.querySelector('.book-a-room-view');
const exploreView = document.querySelector('.explore-view');

// buttons
const homeButton = document.querySelector('#home-button');
const myBookingsViewButton = document.querySelector('#my-bookings-view-button');
const makeBookingViewButton = document.querySelector('#book-a-room-view-button');

// boxes
const sidebar = document.querySelector('.sidebar');
const spendingBox = document.querySelector('.spending');

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
window.addEventListener('load', () => {
  start();
  displayRoleChoice(roleChoiceView);
});

window.addEventListener('click', e => {
  if (e.target.id === 'customer-button') {
    displayLogIn(loginView);
  }
  if (e.target.id === 'back-to-roles' || e.target.id === 'log-out-button') {
    displayRoleChoice(roleChoiceView);
  }
  if (e.target.id === 'login-button') {
    currentUser = getCurrentUser(userData);
    login(e, roomsData, bookingsData, userData, currentUser);
    // const test = document.querySelector('.test');
    // renderCardCollection(test, roomsData);
  }
  if (e.target.id === 'home-button') {
    displayCustomerDashboard(bookingsData, roomsData, currentUser);
  }
  if (e.target.id === 'my-bookings-view-button' || e.target.classList.contains('my-booking')) {
    displayMyBookings(bookingsData, roomsData, currentUser);
  }
  if (e.target.id === 'book-a-room-view-button' || e.target.classList.contains('book-room')) {
    displayMakeBookings(e, bookingsData, roomsData);
  }
  if (e.target.id === "search-rooms-button") {
    e.preventDefault();
    displaySearchResult(bookingsData, roomsData);
  }
  if (e.target.classList.contains('book-this-room-button')) {
    e.preventDefault();
    makeNewBooking(e, currentUser, roomsData, spending);
  }

  // to delete
  if (e.target.classList.contains('test')) {
    displayExploreView(roomsData);
  }
});



export {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  sidebar,
  homeButton,
  myBookingsViewButton,
  makeBookingViewButton,
  spendingBox,
  main,
  start,
  exploreView,
};
