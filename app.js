const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

form.addEventListener('submit', e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});

const showError = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.textContent = message;
  formControl.classList.remove('success');
  formControl.classList.add('error');
};

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

const checkRequired = inputList => {
  inputList.forEach(input => {
    const formControl = input.parentElement;
    const label = formControl.querySelector('label');
    if (input.value.trim() === '') {
      showError(input, `${label.textContent} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  const formControl = input.parentElement;
  const label = formControl.querySelector('label');
  if (input.value.trim().length < min) {
    showError(input, `${label.textContent} must be at least ${min} characters`);
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${label.textContent} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
};

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, `Password do not match`);
  }
};
