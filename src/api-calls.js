// TODO: check if delete and add works

//TODO: change alert message so that it's more user readable
const errorHandling = (response) => {
  let statusType = new String(response.status)[0];
  if (statusType === '4') {
    alert('client error');
    return 'client side error';
  }
};

const processResponse = (response) => {
  let isErr = errorHandling(response);
  let output = isErr ? isErr : response.json();
  console.log('output: ', output);
  return output;
};

const getDataByFetch = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
  .then(response => processResponse(response))
  .catch(err => alert(err));
};

const addNewBooking = (data) => {
  // console.log(JSON.stringify(booking))
  // return fetch('http://localhost:3001/api/v1/bookings', {
  //   method: 'POST',
  //   body: JSON.stringify(booking),
  //   header: {
  //     'Content-Type' : 'application/json' 
  //   }
  // })
  // .then(response => console.log(response.json()))
  // .catch(err => alert(err));

  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
};

// NOTE: argument id should be a string
const deleteSingleBooking = (id) => {
  return fetch('http://localhost:3001/api/v1/bookings/' + id, {
    method: 'DELETE',
    header: {
      'Content-Type' : 'application/json'
    }
  })
  .then(response => processResponse(response))
  .catch(err => alert(err));
};

export { 
  getDataByFetch, 
  addNewBooking, 
  deleteSingleBooking };
