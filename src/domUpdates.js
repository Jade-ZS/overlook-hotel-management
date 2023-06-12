import {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  roomDetailView,
  homeSidebar,
  usernameInput,
  passwordInput,
  invalidPasswordText,
  invalidUserText,
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


// 
const renderMyBookings = () => {

};

const renderMakeBookings = () => {
 
};

const renderRoomDetail = () => {
 

};

 // displays
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

export {
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displayRoomDetail,
  renderLoginCheck,
};
