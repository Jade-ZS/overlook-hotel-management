import {
  roleChoiceView,
  loginView,
  customerDashboard,
  myBookingsView,
  makeBookingView,
  sidebar,
  spendingBox,
  main,
  start,
} from './scripts';

import { 
  addNewBooking, 
} from './api-calls';

import {
  getTotalSpending
} from './customer-dashboard';

import {
  getRoomByDate,
  getRoomByType,

} from './customer-get-room';

import {
  getDateToday,
} from './manager-dashboard';

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

// role choice view
const renderRoleChoice = (view) => {
  view.innerHTML = `
    <h1 class="overlook-title center-text">Overlook</h1>
    <p class="center-text">Are you a customer or a manager?</p>
    <div class="flex-container">
      <button id="customer-button">customer</button>
      <button id="manager-button">manager</button>
    </div>
  `;
};

// log in
const renderLogin = (view) => {
  view.innerHTML = `
    <h1>Log In</h1>
    <form>
      <div class="card">
        <div class="column-flex-container">
          <label for="username" class="hidden">username</label>
          <input id="username" type="text" name="username" placeholder="Enter username" required>
          <span id="invalid-username-text" class="message hidden">Invalid username</span>
        </div>
        <div class="column-flex-container">
          <label for="password" class="hidden">password</label>
          <input id="password" name="password" type="password" placeholder="Password" required>
          <span id="invalid-password-text" class="message hidden">Invalid password</span>
        </div>
        <button id='login-button' type="submit">Submit</button>
      </div>
    </form>
    <p id="back-to-roles">>>> Back to the last page</p>
 `;
};

const checkIfEmpty = input => {
  if (!input.value.length) {
    return true;
  } else {
    return false;
  }
};

const renderEmptyWarning = (input, textBox) => {
  clearView([textBox]);
  changeView([textBox], 'remove', 'hidden');
  textBox.innerText = `${input.id} can\'t be empty`;
  
};

const checkIfValid = (input, userData) => {
  if (input.id === 'username') {
    return checkUser(input.value, userData);
  } else if (input.id === 'password') {
    return checkPassword(input.value, 'overlook2021');
  }
};

const renderInvalidText = (input, textBox) => {
  clearView([textBox]);
  changeView([textBox], 'remove', 'hidden');
  textBox.innerText = `Invalid ${input.id}`;
  
};

const loginCheck = (usernameInput, passwordInput, userData) => {
  let ifUsernamePass = !checkIfEmpty(usernameInput) && checkIfValid(usernameInput, userData);
  let ifPasswordPass = !checkIfEmpty(passwordInput) && checkIfValid(passwordInput, userData);
  let ifPass = ifUsernamePass && ifPasswordPass;
  return ifPass;
};

const renderLoginCheck = (input, userData, textBox) => {
  if (checkIfEmpty(input)) {
    renderEmptyWarning(input, textBox);
  } else if (checkIfValid(input, userData)) {
    renderInvalidText(input, userData, textBox);
  }
};

const getCurrentUser = (userData) => {
  const usernameInput = document.querySelector('#username');
  return userData.find(user => user.id === parseInt(usernameInput.value.substring(8)));
};

const login = (e, roomsData, bookingsData, userData, currentUser) => {
  e.preventDefault();
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const invalidUserText = document.querySelector('#invalid-username-text');
  const invalidPasswordText = document.querySelector('#invalid-password-text');

  if (!loginCheck(usernameInput, passwordInput, userData)) {
    renderLoginCheck(usernameInput, userData, invalidUserText);
    renderLoginCheck(passwordInput, userData, invalidPasswordText);
  } else {
    displayCustomerDashboard(bookingsData, roomsData, currentUser);
  }
};

// side bar
const renderSidebar = (view) => {
  view.innerHTML = `
    <p class="user-info">my profile</p>
    <button id="home-button">
      <span class="icons material-symbols-outlined">home</span>
      <span>Home<span>
    </button>
    <button id="my-bookings-view-button">
      <span class="icons material-symbols-outlined">menu_book</span>
      <span>My Bookings</span>
    </button>
    <button id="book-a-room-view-button">
      <span class="icons material-symbols-outlined">iframe</span>
      <span>Book A Room</span>
    </button>
    <button id="log-out-button">
      <span class="icons material-symbols-outlined">logout</span>
      <span>Log Out</span>
    </button>
  `;
};

const renderSideButtonColor = (sidebar, index) => {
  const buttons = [...sidebar.children];
  buttons.forEach(button => {
    button.classList.remove('noHover');
    button.classList.remove('pressedButton');
    button.classList.remove('light-green');
  });
  
  // if (!main.lastElementChild.classList.contains('hidden')) {
    buttons[index].classList.add('pressedButton');
    buttons[index].classList.add('noHover');
    buttons[index].classList.add('light-green')
  // }
};

// customer dashboard
const renderSpendingBox = (bookingsData, roomsData) => {
  const spending = getTotalSpending(bookingsData, roomsData);
  spendingBox.innerHTML = `Total Spending: $${spending}`;
};

const renderUserInfo = (user, view) => {
  view.innerHTML = `
    <h1>${user.name}</h1>
    <p>username: customer${user.id}</p>
  `;
}

const renderCustomerDashboard = (bookingsData, roomsData, currentUser) => {
  renderSidebar(sidebar);
  renderSpendingBox(bookingsData, roomsData);
  const userInfo = document.querySelector('.user-info');
  renderUserInfo(currentUser, userInfo);
};

// my bookings
const checkBidet = room => {
  if (room.bidet) {
    return 'with bidet';
  } else {
    return 'without bidet';
  }
};

const renderSingleBookingItem = (booking, rooms) => {
  const room = rooms.find(room => room.number === booking.roomNumber)
  const singleBooking = `
    <tr class=booking-item id=${booking.id}> 
      <td class=info-item>${booking.date}</td>
      <td class=info-item>${booking.id}</td>
      <td class=info-item>${room.costPerNight}</td>
      <td class=info-item>${room.roomType}</td>
      <td class=info-item>room #${room.number}: ${room.numBeds} × ${room.bedSize} size 🛏️ ${checkBidet(room)} </td>
    </tr>
  `;
  return singleBooking;
};

const renderBookingItems = (bookings, rooms, currentUser) => {
  const myBookings = bookings.filter(booking => booking.userID === currentUser.id);
  let bookingItems = '';
  myBookings.forEach(booking => bookingItems += renderSingleBookingItem(booking, rooms));
  return bookingItems;
};

const renderMyBookings = (bookings, rooms, currentUser) => {
  myBookingsView.innerHTML = `
    <article class="flex-item header">My Bookings</article>
    <div class="tableFixHead my-booking-info-box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order Number</th>
              <th>Cost</th>
              <th>Room Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${renderBookingItems(bookings, rooms, currentUser)} 
          </tbody>
        </table>
    </div>
  `;
};

// make bookings view
const getChosenDate = () => {
  const dateInput = document.querySelector('#date');
  if (!dateInput.value.length) {
    alert('date input can not be empty!');
    return 
  }
  return dateInput.value.split('-').join('/');
};

const getAvailableRooms = (bookings, rooms) => {
  const date = getChosenDate();
  if (!date) {
    return; 
  }
  let availableRooms = getRoomByDate(date, bookings, rooms);
  const roomTypeInput = document.querySelector('#room-type');
  if (roomTypeInput.value !== 'all') {
    availableRooms = getRoomByType(roomTypeInput.value, availableRooms);
  }
  return availableRooms;
};

const renderSearchBox = () => {
  const searchBox = `
    <form action="">
      <label for="date">Date</label>
      <input type="date" id="date" name="date" min=${getDateToday().split('/').join('-')} required>

      <label for="room-type">Room Type</label>
      <select id="room-type">
        <option value="all">All</option>
        <option value="suite">suite</option>
        <option value="residential suite" selected>residential suite</option>
        <option value="junior suite">junior suite</option>
        <option value="single room">single room</option>
      </select>  
  
      <button id="search-rooms-button">Search</button>
    </form>
  `;
  return searchBox;
};

const renderSingleRoomItem = (room) => {
  const singleRoom = `
    <tr class=booking-item id="room-number-${room.number}"}> 
      <td class=info-item>${room.roomType}</td>
      <td class=info-item>${room.bidet}</td>
      <td class=info-item>${room.bedSize}</td>
      <td class=info-item>${room.numBeds}</td>
      <td class=info-item>${room.costPerNight}</td>
      <td class=info-item>
        <button class="book-this-room-button" id="${room.number}">book this room</button>
      </td>
    </tr>
  `;
  return singleRoom;
};

const renderRoomItems = (rooms) => {
  let roomItems = '';
  rooms.forEach(room => roomItems += renderSingleRoomItem(room));
  return roomItems;
};

const renderResultBox = (rooms) => {
  let resultBox;
  if (typeof rooms === 'string') {
    resultBox = `
      <p>No available room is found. Please try a different date or room type.</p>
    `;
  } else {
    resultBox = `
      <div class="tableFixHead">
        <table>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Bidet</th>
              <th>Bed Size</th>
              <th>Bed Numbers</th>
              <th>Cost Per Night</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${renderRoomItems(rooms)} 
          </tbody>
        </table>
      </div>
    `;
}

 return resultBox;
};

const renderMakeBookings = (rooms) => {
  makeBookingView.innerHTML = `
    <article class="flex-item header">${renderSearchBox()}</article>
    <div class="flex-item available-rooms-box">${renderResultBox(rooms)}</div>
  `;
};

const getDataToPost = (e, currentUser) => {
  let date = getChosenDate();
  let userID = currentUser.id;
  let roomNumber = parseInt(e.target.id);
  
  let bookingToAdd = {
    userID, 
    date, 
    roomNumber};

  return bookingToAdd;
};

const makeNewBooking = (e, currentUser, roomsData, spending) => {
  const bookingToAdd = getDataToPost(e, currentUser);
  if (bookingToAdd.date && bookingToAdd.date.length) {
    addNewBooking(bookingToAdd)
    .then(() => {
      spending += parseInt(roomsData.find(room => room.number === bookingToAdd.roomNumber).costPerNight);
      e.target.disabled = true;
      start();
      alert('You\'ve successfully booked this room!');
    })
    .catch(() => alert('Booking was failed.'));
  }
};

 // displays
 const displayRoleChoice = (view) => {
  const itemsToHide = [main, sidebar, loginView, customerDashboard, myBookingsView, makeBookingView];
  const itemsToShow = [roleChoiceView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  renderRoleChoice(view);
};

const displayLogIn = (view) => {
  const itemsToHide = [main, sidebar, roleChoiceView, customerDashboard, myBookingsView, makeBookingView];
  const itemsToShow = [loginView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  renderLogin(view);
};

const displayCustomerDashboard = (bookingsData, roomsData, currentUser) => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView];
  const itemsToShow = [main, sidebar, customerDashboard];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
  
  renderCustomerDashboard(bookingsData, roomsData, currentUser);
  renderSideButtonColor(sidebar, 1);
};

const displayMyBookings = (bookings, rooms, currentUser) => {
  const itemsToHide = [roleChoiceView, loginView, customerDashboard, makeBookingView];
  const itemsToShow = [main, sidebar, myBookingsView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  clearView([myBookingsView]);
  renderMyBookings(bookings, rooms, currentUser);
  renderSideButtonColor(sidebar, 2);
};

const displayMakeBookings = (e, bookings, rooms) => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, customerDashboard];
  const itemsToShow = [main, sidebar, makeBookingView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  clearView([makeBookingView]);
  renderMakeBookings(rooms);
  renderSideButtonColor(sidebar, 3);
};

const displayRoomDetail = () => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView, customerDashboard];
  const itemsToShow = [main, sidebar];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displaySearchResult = (bookings, rooms) => {
  let searchResult = getAvailableRooms(bookings, rooms);
  let availableRooms = searchResult? searchResult : rooms;
  const searchResultBox = document.querySelector('.available-rooms-box');
  searchResultBox.innerHTML = renderResultBox(availableRooms);
};

export {
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displayRoomDetail,
  displaySearchResult,
  login,
  getCurrentUser,
  makeNewBooking,
};
