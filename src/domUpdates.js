import {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  roomDetailView,
  sidebar,
  usernameInput,
  passwordInput,
  invalidPasswordText,
  invalidUserText,
  myTripsBox,
} from './scripts';

import { 
  checkPassword,
  checkUser,
 } from './log-in';

const changeView = (views, action, classToToggle) => {
  views.forEach(view => view.classList[action](classToToggle));
};

const clearView = views => {
  views.forEach(view => view.innerHTML = '');
};

const renderRoleChoice = () => {

};

const renderLoginCheck = (userData) => {
  let isValid = false;
  let isValidName = checkUser(usernameInput.value, userData);
  let isValidPassword = checkPassword(passwordInput.value, 'overlook2021');
  invalidUserText.innerText = '';
  invalidPasswordText.innerText = '';

  if (!isValidName) {
    invalidUserText.innerText = 'Invalid username';
    changeView([invalidUserText], 'remove', 'hidden');
  } 
  
  if (!isValidPassword) {
    invalidPasswordText.innerText = 'Invalid password';
    changeView([invalidPasswordText], 'remove', 'hidden');
  }

  if (!usernameInput.value.length) {
    changeView([invalidUserText], 'remove', 'hidden');
    invalidUserText.innerText = 'username can\'t be empty';
  } 
  
  if (!passwordInput.value.length) {
    changeView([invalidPasswordText], 'remove', 'hidden');
    invalidPasswordText.innerText = 'password can\'t be empty';
  }

  if (isValidName && isValidName) {
    isValid = true;
  }

  return isValid;
};

// customer dashboard
const renderCustomerDashboard = () => {

};

const renderHomeSidebard = (user) => {
  homeSidebar.innerHTML = `
    <h1>${user.name}</h1>
    <p>username: customer${user.id}</p>
  `;
}


// my bookings
const renderMyBookings = (booking) => {
  myTripsBox.innerHTML += `
      <p> 
        <span>${booking.date}</span>
        <span>${booking.id}</span>
      </p>
  `;
};



const renderMakeBookings = () => {
 
};

const renderRoomDetail = () => {
 

};

 // displays
 const displayRoleChoice = () => {
  const itemsToHide = [sidebar, loginView, customerDashboard, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [roleChoiceView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayLogIn = () => {
  const itemsToHide = [sidebar, roleChoiceView, customerDashboard, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [loginView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayCustomerDashboard = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView, roomDetailView];
  const itemsToShow = [sidebar, customerDashboard];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
  
};

const displayMyBookings = (bookings, currentUser) => {
  const itemsToHide = [roleChoiceView, loginView, customerDashboard, makeBookingView, roomDetailView];
  const itemsToShow = [sidebar, myBookingsView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  const myBookings = bookings.filter(booking => booking.userID === currentUser.id);

  clearView([myTripsBox]);
  myBookings.forEach(booking => renderMyBookings(booking));
};

const displayMakeBookings = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, customerDashboard, roomDetailView];
  const itemsToShow = [sidebar, makeBookingView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayRoomDetail = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView, customerDashboard];
  const itemsToShow = [sidebar, roomDetailView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

export {
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displayRoomDetail,
  renderLoginCheck,
};
