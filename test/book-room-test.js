import chai from 'chai';
import { sampleBookings, sampleRooms, sampleCustomers } from './sample-data';
import { matchItem, checkDateFormat, getRoomByDate, getRoomByType } from '../src/book-room'
const expect = chai.expect;

// matchItem is not used, might need to get rid of this
describe('matchItem', function() {
  it('should be a function', () => {
    expect(matchItem).to.be.a('function');
  });

  it('should take three arguments (one of them being a string and one of them being an array) and return a message if the arguments were of a wrong type', () => {
    const failure1 = matchItem('', '', '');
    const failure2 = matchItem( 1, 1, sampleCustomers);
    const failure3 = matchItem('', sampleCustomers, sampleCustomers);

    expect(failure1).to.equal('matchItem Error: wrong input type');
    expect(failure2).to.equal('matchItem Error: wrong input type');
    expect(failure3).to.equal('matchItem Error: wrong input type');
  });

  it('a matching customer should be returned given a valid id', function() {
    const customerById1 = matchItem(1, 'id', sampleCustomers);
    const customerById2 = matchItem(2, 'id', sampleCustomers);
    const customerById3 = matchItem(3, 'id', sampleCustomers);
    const customerById4 = matchItem(4, 'id', sampleCustomers);
    const customerById5 = matchItem(5, 'id', sampleCustomers); 
    
    expect(customerById1).to.deep.equal(sampleCustomers[0]);
    expect(customerById2).to.deep.equal(sampleCustomers[1]);
    expect(customerById3).to.deep.equal(sampleCustomers[2]);
    expect(customerById4).to.deep.equal(sampleCustomers[3]);
    expect(customerById5).to.deep.equal(sampleCustomers[4]);
  });

  it('a matching customer should be returned given a valid name', function() {
    const customerByName1 = matchItem('Leatha Ullrich', 'name', sampleCustomers);
    const customerByName2 = matchItem('Rocio Schuster', 'name', sampleCustomers);
    const customerByName3 = matchItem('Kelvin Schiller', 'name', sampleCustomers);
    const customerByName4 = matchItem('Kennedi Emard', 'name', sampleCustomers);
    const customerByName5 = matchItem('Rhiannon Little', 'name', sampleCustomers);    

    expect(customerByName1).to.deep.equal(sampleCustomers[0]);
    expect(customerByName2).to.deep.equal(sampleCustomers[1]);
    expect(customerByName3).to.deep.equal(sampleCustomers[2]);
    expect(customerByName4).to.deep.equal(sampleCustomers[3]);
    expect(customerByName5).to.deep.equal(sampleCustomers[4]);
  });

  it('a message should be returned if no matching item was found', function() {
    const noMatchingCustomer = matchItem('', '', sampleCustomers);
    expect(noMatchingCustomer).to.equal('No matching item was found.');
  });
});

describe('checkDateFormat', function() {
  let outputs = [];
  beforeEach(() => {
    outputs[0] = checkDateFormat('This isn\'t a date.');
    outputs[1] = checkDateFormat('2023/06/06');
  })
  
  it('should be a function', () => {
    expect(checkDateFormat).to.be.a('function');
  });

  it('should return a boolean value', () => {
    expect(typeof outputs[0]).to.equal('boolean');
    expect(typeof outputs[1]).to.equal('boolean');
  });

  it('should return true if the date format is correct', () => {
    expect(outputs[1]).to.equal(true);
  });

  it('should return true if the date format is correct', () => {
    expect(outputs[0]).to.equal(false);
  })

});

describe('getRoomByDate', function() {
  it('should be a function', () => {
    expect(getRoomByDate).to.be.a('function');
  });
 
  it('should take three arguments (one of them being a string and two of them being an array) and return a message if the arguments were of a wrong type', () => {
    const failure1 = getRoomByDate('', '', '');
    const failure2 = getRoomByDate( 1, 1, sampleBookings);
    const failure3 = getRoomByDate(sampleCustomers, sampleBookings, sampleRooms);

    expect(failure1).to.equal('getRoomByDate Error: wrong input type');
    expect(failure2).to.equal('getRoomByDate Error: wrong input type');
    expect(failure3).to.equal('getRoomByDate Error: wrong input type');
  });

  it('should return the available rooms on the provided day', function() {
    const roomByDate1 = getRoomByDate('2022/04/22', sampleBookings, sampleRooms);
    const roomByDate2 = getRoomByDate('2022/01/24', sampleBookings, sampleRooms);
    const roomByDate3 = getRoomByDate('2022/01/10', sampleBookings, sampleRooms);
    const roomByDate4 = getRoomByDate('2022/02/16', sampleBookings, sampleRooms);
    const roomByDate5 = getRoomByDate('2022/02/05', sampleBookings, sampleRooms);

    expect(roomByDate1).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[3], sampleRooms[4]]);
    expect(roomByDate2).to.deep.equal([sampleRooms[0], sampleRooms[2], sampleRooms[3], sampleRooms[4]]);
    expect(roomByDate3).to.deep.equal([sampleRooms[0], sampleRooms[1], sampleRooms[3], sampleRooms[4]]);
    expect(roomByDate4).to.deep.equal([sampleRooms[0], sampleRooms[1], sampleRooms[2], sampleRooms[4]]);
    expect(roomByDate5).to.deep.equal([sampleRooms[0], sampleRooms[1], sampleRooms[2], sampleRooms[3]]);
  });

  it('should return a message if there is no available room on the given day', function() {
    const fullBookings = sampleBookings.map(booking => {
      booking.date = '2008/01/01';
      return booking;
    });
    const noRoom = getRoomByDate('2008/01/01', fullBookings, sampleRooms);
    expect(noRoom).to.equal('We are sorry that no room is available for the date you selected. Please select a different date.');
  });
});

describe('getRoomByType', function() {
  it('should be a function', () => {
    expect(getRoomByType).to.be.a('function');
  });

  it('should take two arguments (one of them being a string and one of them being an array) and return a message if the arguments were of a wrong type', () => {
    const failure1 = getRoomByType('', '', '');
    const failure2 = getRoomByType( 1, sampleBookings);
    const failure3 = getRoomByType(sampleBookings, sampleRooms);

    expect(failure1).to.equal('getRoomByType Error: wrong input type');
    expect(failure2).to.equal('getRoomByType Error: wrong input type');
    expect(failure3).to.equal('getRoomByType Error: wrong input type');
  });

  it('should return an array of room objects if matching rooms were found given a room type', function() {
    const roomByType1 = getRoomByType('residential suite', sampleRooms);
    const roomByType2 = getRoomByType('suite', sampleRooms);
    const roomByType3 = getRoomByType('single room', sampleRooms);
  
    expect(roomByType1).to.deep.equal([sampleRooms[0]]);
    expect(roomByType2).to.deep.equal([sampleRooms[1]]);
    expect(roomByType3).to.deep.equal([sampleRooms[2], sampleRooms[3], sampleRooms[4]]);
  });

  it('should return a message if no matching room was found', function() {
    const noMatchingRoom = getRoomByType('', sampleRooms);
    expect(noMatchingRoom).to.equal('We are sorry that we do not have this room type available on the date you chose. Please try a different room type.');
  });

});



  