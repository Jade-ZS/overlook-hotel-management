import chai from 'chai';
const expect = chai.expect;
import { sampleBookings } from './sample-data';
import { checkIfPast } from '../src/manage-bookings';

describe('checkIfPast', function() {
  let resultsToTest = [];
  let bookings = JSON.parse(JSON.stringify(sampleBookings));
  beforeEach(() => {
    resultsToTest[0] = checkIfPast(1, '2023/06/06', bookings);
    resultsToTest[1] = checkIfPast(2, '2023/06/06', bookings);
    resultsToTest[2] = checkIfPast(3, '2023/06/06', bookings);
    resultsToTest[3] = checkIfPast(1, '2000/01/01', bookings);
    resultsToTest[4] = checkIfPast(4, '2000/01/01', bookings);
    resultsToTest[5] = checkIfPast(5, '2000/01/01', bookings);
  });
  
  it('should return a false if a given booking\'s date is not in the past', function() {
    expect(resultsToTest[0]).to.equal(false);
    expect(resultsToTest[1]).to.equal(false);
    expect(resultsToTest[2]).to.equal(false);
  });

  it('should return a true if the given booking\'s day is in the past', function() {
    expect(resultsToTest[3]).to.equal(true);
    expect(resultsToTest[4]).to.equal(true);
    expect(resultsToTest[5]).to.equal(true);
  });
});
