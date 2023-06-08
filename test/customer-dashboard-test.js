import chai from 'chai';
import { getMyBookings, getTotalSpending } from '../src/customer-dashboard';
import { sampleBookings, sampleRooms } from './sample-data';
const expect = chai.expect;

describe('getMyBookings', function() {
  let bookings;
  let myBookings;
  beforeEach(() => {
    const bookings1 = JSON.parse(JSON.stringify(sampleBookings));
    bookings1[1].userID = 1;
    const bookings2 = JSON.parse(JSON.stringify(sampleBookings));
    bookings2[0].userID = 2;
    bookings2[2].userID = 2;
    const bookings3 = JSON.parse(JSON.stringify(sampleBookings));
    bookings3[3].userID = 3;
    bookings3[4].userID = 3;
    bookings = [bookings1, bookings2, bookings3];

    const myBookings1 = [bookings[0][0], bookings[0][1]];
    const myBookings2 = [bookings[1][0], bookings[1][1], bookings[1][2]];
    const myBookings3 = [bookings[2][2], bookings[2][3], bookings[2][4]];
    myBookings = [myBookings1, myBookings2, myBookings3];
  });
  
  it('should return an array of bookings', function() {  
    expect(getMyBookings(1, bookings[0])).to.deep.equal(myBookings[0]);
    expect(getMyBookings(2, bookings[1])).to.deep.equal(myBookings[1]);
    expect(getMyBookings(3, bookings[2])).to.deep.equal(myBookings[2]);
  });

  it('should return a message if the customer does not have any booking on file', function() {
    expect().to.equal();
  });

});

describe('getTotalSpending', function() {
  let myBookings = [];
  let spendings = [];
  beforeEach(() => {
    myBookings[0] = [sampleBookings[0]];
    myBookings[1] = sampleBookings.slice(0, 2);
    myBookings[2] = sampleBookings.slice(0, 3);
    myBookings[3] = sampleBookings.slice(0, 4);
    myBookings[4] = sampleBookings;
    
    spendings[0] = 358.4;
    spendings[1] = 358.4 + 477.38;
    spendings[2] = 358.4 + 477.38 + 491.14;
    spendings[3] = 358.4 + 477.38 + 491.14 + 429.44;
    spendings[4] = 358.4 + 477.38 + 491.14 + 429.44 + 340.17;
  });
  
  it('should return the total spending of the customer\'s bookings', function() {
    expect(getTotalSpending(myBookings[0], sampleRooms)).to.equal(spendings[0]);
    expect(getTotalSpending(myBookings[1], sampleRooms)).to.equal(spendings[1]);
    expect(getTotalSpending(myBookings[2], sampleRooms)).to.equal(spendings[2]);
    expect(getTotalSpending(myBookings[3], sampleRooms)).to.equal(spendings[3]);
    expect(getTotalSpending(myBookings[4], sampleRooms)).to.equal(spendings[4]);
  });
});

