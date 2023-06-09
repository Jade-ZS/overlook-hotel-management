import { matchItem } from './customer-get-room';

const checkPassword = (userInput, correctPassword) => {
  if (userInput === correctPassword) {
    return true;
  } else {
    return false;
  }
};

const checkUsernameFormat = userInput => {
  let str = userInput.substring(0, 8);
  let num = userInput.substring(8);
  if (str === 'customer' && parseInt(num)) {
    return parseInt(num);
  } else {
    return false;
  }
};

const checkUser = (userInput, users) => {
  let id = checkUsernameFormat(userInput);
  if (id && id < users.length + 1) {
    return matchItem(id, 'id', users);
  } else {
    return false;
  }
};

const getLogInResult = (password, correctPassword, username, users) => {
  let isValidUser = checkUser(username, users);
  if (!isValidUser) {
    return  'Sorry, this user does not exist.';
  }
 
  let isCorrectPassword = checkPassword(password, correctPassword);
  if (!isCorrectPassword) {
    return 'The password is incorrect.';
  }

  return `You\'ve successfully logged in as ${username}!`
}

export { 
  checkPassword, 
  checkUsernameFormat, 
  checkUser, 
  getLogInResult 
} 