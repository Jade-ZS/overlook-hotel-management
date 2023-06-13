import chai from 'chai';
import { 
  getDateToday, 
  getOccupiedRoomsForDay, 
  getBookingsForDay, 
  getRevenueForDay, 
  getOccupancyRateForDay 
} from '../src/manager-dashboard.js';
import { sampleBookings, sampleRooms } from './sample-data';
const expect = chai.expect;
const bookings = JSON.parse(JSON.stringify(sampleBookings));

describe('getDateToday', function() {
  let today;
  beforeEach(() => {
    const date = new Date();
    const year = date.getFullYear();
    today = `${year}/` + date.toLocaleDateString("en-US", {
      month: '2-digit',
      day: '2-digit'
    });
  });

  it('should return today\'s date', function() {
    expect(getDateToday()).to.equal(today);
  });
});
      
describe('getOccupiedRoomsForDay', function() {
  let occupiedRooms; 
  let subjectsToTest;
  beforeEach(() => {
    const occupiedRooms1 = [sampleRooms[0]];
    const occupiedRooms2 = [sampleRooms[1]];
    const occupiedRooms3 = [sampleRooms[2]];
    const occupiedRooms4 = [sampleRooms[3]];
    const occupiedRooms5 = [sampleRooms[4]];
    occupiedRooms = [occupiedRooms1, occupiedRooms2, occupiedRooms3, occupiedRooms4, occupiedRooms5];

    const roomsToTest1 = getOccupiedRoomsForDay('2022/04/22', bookings, sampleRooms);
    const roomsToTest2 = getOccupiedRoomsForDay('2022/01/24', bookings, sampleRooms);
    const roomsToTest3 = getOccupiedRoomsForDay('2022/01/10', bookings, sampleRooms);
    const roomsToTest4 = getOccupiedRoomsForDay('2022/02/16', bookings, sampleRooms);
    const roomsToTest5 = getOccupiedRoomsForDay('2022/02/05', bookings, sampleRooms);
    subjectsToTest = [roomsToTest1, roomsToTest2, roomsToTest3, roomsToTest4, roomsToTest5];
  });
  
  it('should return an array', function() {
    expect(Array.isArray(subjectsToTest[0])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[1])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[2])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[3])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[4])).to.deep.equal(true);
  });
  
  it('should return occupied rooms based on a given day', function() {
    expect(subjectsToTest[0]).to.deep.equal(occupiedRooms[0]);
    expect(subjectsToTest[1]).to.deep.equal(occupiedRooms[1]);
    expect(subjectsToTest[2]).to.deep.equal(occupiedRooms[2]);
    expect(subjectsToTest[3]).to.deep.equal(occupiedRooms[3]);
    expect(subjectsToTest[4]).to.deep.equal(occupiedRooms[4]);
  });
});

describe('getBookingsForDay', function() {
  let bookingsForDay;
  let subjectsToTest;
  beforeEach(() => {
    bookingsForDay = bookings.map(booking => [booking]);
    const bookingsToTest1 = getBookingsForDay('2022/04/22', bookings);
    const bookingsToTest2 = getBookingsForDay('2022/01/24', bookings);
    const bookingsToTest3 = getBookingsForDay('2022/01/10', bookings);
    const bookingsToTest4 = getBookingsForDay('2022/02/16', bookings);
    const bookingsToTest5 = getBookingsForDay('2022/02/05', bookings);
    subjectsToTest = [bookingsToTest1, bookingsToTest2, bookingsToTest3, bookingsToTest4, bookingsToTest5];
  });
  
  it('should return an array', function() {
    expect(Array.isArray(subjectsToTest[0])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[1])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[2])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[3])).to.deep.equal(true);
    expect(Array.isArray(subjectsToTest[4])).to.deep.equal(true);
  });
  
  it('should return all the bookings based on a given day', function() {
    expect(subjectsToTest[0]).to.deep.equal(bookingsForDay[0]);
    expect(subjectsToTest[1]).to.deep.equal(bookingsForDay[1]);
    expect(subjectsToTest[2]).to.deep.equal(bookingsForDay[2]);
    expect(subjectsToTest[3]).to.deep.equal(bookingsForDay[3]);
    expect(subjectsToTest[4]).to.deep.equal(bookingsForDay[4]);
  });
});

describe('getRevenueForDay', function() {
  let bookingSamples;
  let targetRevenues;
  let revenuesToTest;
  beforeEach(() => {
    const bookingSample1 = JSON.parse(JSON.stringify(bookings));
    const bookingSample2 = JSON.parse(JSON.stringify(bookings));
    bookings[1].date = '2022/04/22';
    const bookingSample3 = JSON.parse(JSON.stringify(bookings));
    bookingSample3.forEach(booking => booking.date = '2022/04/22');
    bookingSamples = [bookingSample1, bookingSample2, bookingSample3];

    const revenue1 = 340.17;
    const revenue2 = 358.4 + 477.38;
    const revenue3 = 358.4 + 477.38 + 491.14 + 429.44 + 340.17;
    targetRevenues = [revenue1, revenue2, revenue3];

    const revenueToTest1 = getRevenueForDay('2022/02/05', bookingSamples[0], sampleRooms);
    const revenueToTest2 = getRevenueForDay('2022/04/22', bookingSamples[1], sampleRooms);
    const revenueToTest3 = getRevenueForDay('2022/04/22', bookingSamples[2], sampleRooms);
    revenuesToTest = [revenueToTest1, revenueToTest2, revenueToTest3];
  });
  
  it('should return a number', function() {
    expect(typeof revenuesToTest[0]).to.equal('number');
    expect(typeof revenuesToTest[1]).to.equal('number');
  });
  
  it('should return revenues based on a given day', function() {
    expect(revenuesToTest[0]).to.equal(Math.floor(targetRevenues[0]));
    expect(revenuesToTest[1]).to.equal(Math.floor(targetRevenues[1]));
  });
});

describe('getOccupancyRateForDay', function() {
  let ratesToTest;
  beforeEach(() => {
    const rateToTest1 = getOccupancyRateForDay('2022/02/16', bookings, sampleRooms);
    const rateToTest2 = getOccupancyRateForDay('2022/01/10', bookings, sampleRooms);
    const rateToTest3 = getOccupancyRateForDay('2022/02/05', bookings, sampleRooms);
    ratesToTest = [rateToTest1, rateToTest2, rateToTest3];
  });

  it('should return a string', function() {
    expect(typeof ratesToTest[0]).to.equal('string');
    expect(typeof ratesToTest[1]).to.equal('string');
    expect(typeof ratesToTest[2]).to.equal('string');
  });
  
  it('should return room occupancy rate based on a given day', function() {
    expect().to.equal();
    expect(ratesToTest[0]).to.equal('20%');
    expect(ratesToTest[1]).to.equal('20%');
    expect(ratesToTest[2]).to.equal('20%');
  });
});

