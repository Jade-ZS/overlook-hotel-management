import {
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
  spendingBox,
  userInfo,
  main,
} from './scripts';

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
const renderSpendingBox = (spending) => {
  spendingBox.innerHTML = `Total Spending: $${spending}`;
};

const renderUserInfo = (user) => {
  userInfo.innerHTML = `
    <h1>${user.name}</h1>
    <p>username: customer${user.id}</p>
  `;
}

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
    <div class="tableFixHead flex-item column-flex-container my-booking-info-box">
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

 // displays
 const displayRoleChoice = () => {
  const itemsToHide = [main, sidebar, loginView, customerDashboard, myBookingsView, makeBookingView];
  const itemsToShow = [roleChoiceView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayLogIn = () => {
  const itemsToHide = [main, sidebar, roleChoiceView, customerDashboard, myBookingsView, makeBookingView];
  const itemsToShow = [loginView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
};

const displayCustomerDashboard = (spending) => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, makeBookingView];
  const itemsToShow = [main, sidebar, customerDashboard];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');
  
  renderSpendingBox(spending);
};

const displayMyBookings = (bookings, rooms, currentUser) => {
  const itemsToHide = [roleChoiceView, loginView, customerDashboard, makeBookingView];
  const itemsToShow = [main, sidebar, myBookingsView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  clearView([myBookingsView]);
  renderMyBookings(bookings, rooms, currentUser);
};

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
}

const displayMakeBookings = (e, bookings, rooms) => {
  const itemsToHide = [roleChoiceView, loginView, myBookingsView, customerDashboard];
  const itemsToShow = [main, sidebar, makeBookingView];
  changeView(itemsToHide, 'add', 'hidden');
  changeView(itemsToShow, 'remove', 'hidden');

  clearView([makeBookingView]);

  renderMakeBookings(rooms);
  
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
  getChosenDate,
  getAvailableRooms,
  displayRoleChoice,
  displayLogIn,
  displayCustomerDashboard,
  displayMyBookings,
  displayMakeBookings,
  displayRoomDetail,
  displaySearchResult,
  renderLoginCheck,
  renderUserInfo,
};
