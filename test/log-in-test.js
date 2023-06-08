import chai from 'chai';
import { sampleCustomers } from './sample-data';
import { 
  checkPassword, 
  checkUsernameFormat, 
  checkUser, 
  getLogInResult 
} from '../src/log-in';

const expect = chai.expect;

describe('checkPassword', function() {
  let results = [];
  beforeEach(() => {
    results[0] = checkPassword('overlook2023', 'overlook2023');
    results[1] = checkPassword('overlook', 'overlook2023');
  });

  it('should return true if the input password match the correct password', () => {
    expect(results[0]).to.equal(true);
  });

  it('should return false if the input password does not match the correct password', () => {
    expect(results[1]).to.equal(false);
  });
});

describe('checkUsernameFormat', function() {
  let results = [];
  beforeEach(() => {
    results[0] = checkUsernameFormat('customer1');
    results[1] = checkUsernameFormat('customer2');
    results[2] = checkUsernameFormat('customer3');
    results[3] = checkUsernameFormat('customer');
    results[4] = checkUsernameFormat('1');
    results[5] = checkUsernameFormat('customerrrrr1');
  });

  it('should return a number if the username format is correct', () => {
    expect(typeof results[0]).to.equal('number');
    expect(typeof results[1]).to.equal('number');
    expect(typeof results[2]).to.equal('number');
  });

  it('should return the user id if the username format is correct', () => {
    expect(results[0]).to.equal(1);
    expect(results[1]).to.equal(2);
    expect(results[2]).to.equal(3);
  });

  it('should return false if the username format is incorrect', () => {    
    expect(results[3]).to.equal(false);
    expect(results[4]).to.equal(false);
    expect(results[5]).to.equal(false);
  });
});

describe('checkUser', function() {
  let results = [];
  beforeEach(() => {
    results[0] = checkUser('customer1', sampleCustomers);
    results[1] = checkUser('customer2', sampleCustomers);
    results[2] = checkUser('customer3', sampleCustomers);
    results[3] = checkUser('customer', sampleCustomers);
    results[4] = checkUser('1', sampleCustomers);
    results[5] = checkUser('customerrrrr1', sampleCustomers);
  });

  it('should return a customer object if the user exist', () => {
    expect(results[0]).to.equal(sampleCustomers[0]);
    expect(results[1]).to.equal(sampleCustomers[1]);
    expect(results[2]).to.equal(sampleCustomers[2]);
  });

  it('should return false if the user does not exist', () => {
    expect(results[3]).to.equal(false);
    expect(results[4]).to.equal(false);
    expect(results[5]).to.equal(false);
  });
});

describe('getLogInResult', function() {
  let results = [];
  beforeEach(() => {
    results[0] = getLogInResult('overlook2021', 'overlook2021', 'customer2', sampleCustomers);
    results[1] = getLogInResult('overlook2022', 'overlook2022', 'customer1', sampleCustomers);
    results[2] = getLogInResult('overlook2023', 'overlook2023', 'customer3', sampleCustomers);
    results[3] = getLogInResult('overlook2021', 'overlook2021', 'customer', sampleCustomers);
    results[4] = getLogInResult('overlook2021', 'overlook2021', '1', sampleCustomers);
    results[5] = getLogInResult('hi', 'overlook2021', 'customer1', sampleCustomers);
    results[6] = getLogInResult('2021', 'overlook2021', 'customer1', sampleCustomers);
  });

  it('should return a message if the log in is successful', () => {
    expect(results[0]).to.equal('You\'ve successfully logged in as customer2!');
    expect(results[1]).to.equal('You\'ve successfully logged in as customer1!');
    expect(results[2]).to.equal('You\'ve successfully logged in as customer3!');
  });

  it('should return a message if the password is incorrect', () => {
    expect(results[3]).to.equal('Sorry, this user does not exist.');
    expect(results[4]).to.equal('Sorry, this user does not exist.');
  });

  it('should return a message if the user does not exist', () => {
    expect(results[5]).to.equal('The password is incorrect.');
    expect(results[6]).to.equal('The password is incorrect.');
  });
});

