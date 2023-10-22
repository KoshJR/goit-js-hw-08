import throttle from 'lodash.throttle';
const formInput = document.querySelector('.feedback-form');

let clientData = {};
const textInputTrottle = throttle(textInput, 500);
formInput.addEventListener('input', textInputTrottle);

function textInput(event) {
  clientData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(clientData));
}

function localStorageCheck() {
  const userdata = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (userdata !== null) {
    clientData = userdata;
    for (const key in userdata) {
      formInput.elements[key].value = userdata[key];
    }
  }
}

localStorageCheck();

formInput.addEventListener('submit', clickOnSubmit);
function clickOnSubmit(evt) {
  evt.preventDefault();
  if (evt.target.email.value === '' || evt.target.message.value === '') {
    return alert('Please fill in all the fields!');
  }
  console.log(clientData);
  evt.target.reset();
  localStorage.removeItem('feedback-form-state');
  clientData = {};
}
