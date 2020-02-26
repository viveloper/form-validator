class App {
  constructor() {
    this.state = {
      username: {
        key: 'username',
        value: '',
        errorMsg: ''
      },
      email: {
        key: 'email',
        value: '',
        errorMsg: ''
      },
      password: {
        key: 'password',
        value: '',
        errorMsg: ''
      },
      confirmPassword: {
        key: 'confirmPassword',
        value: '',
        errorMsg: ''
      },
      focus: {
        id: 'username',
        position: 0
      }
    };

    this.el = document.querySelector('#app');
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  bindEvents() {
    const form = document.querySelector('#form');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');

    form.addEventListener('submit', this.handleSubmit.bind(this));
    username.addEventListener('keyup', this.handleInputChange.bind(this));
    email.addEventListener('keyup', this.handleInputChange.bind(this));
    password.addEventListener('keyup', this.handleInputChange.bind(this));
    confirmPassword.addEventListener(
      'keyup',
      this.handleInputChange.bind(this)
    );
  }

  handleInputChange(e) {
    const newState = {
      ...this.state,
      [e.target.id]: {
        ...this.state[e.target.id],
        value: e.target.value
      },
      focus: {
        id: e.target.id,
        position: e.target.selectionStart
      }
    };
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.checkRequire([
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.confirmPassword
    ]);
    this.checkLength(this.state.username, 3, 15);
    this.checkLength(this.state.password, 6, 25);
    this.checkEmail(this.state.email);
    this.checkPasswordMatch(this.state.password, this.state.confirmPassword);

    if (
      this.state.username.errorMsg === 'success' &&
      this.state.email.errorMsg === 'success' &&
      this.state.password.errorMsg === 'success' &&
      this.state.confirmPassword.errorMsg === 'success'
    ) {
      console.log('submit', {
        username: this.state.username.value,
        email: this.state.email.value,
        password: this.state.password.value,
        confirmPassword: this.state.confirmPassword.value
      });
    } else {
      console.log('input is not valid');
    }
  }

  checkRequire(inputList) {
    inputList.forEach(input => {
      if (input.value.trim().length === 0) {
        this.setState({
          ...this.state,
          [input.key]: {
            ...input,
            errorMsg: `${input.key} is required`
          }
        });
      } else {
        this.setState({
          ...this.state,
          [input.key]: {
            ...input,
            errorMsg: `success`
          }
        });
      }
    });
  }

  checkLength(input, min, max) {
    if (input.value.trim().length < min) {
      this.setState({
        ...this.state,
        [input.key]: {
          ...input,
          errorMsg: `${input.key} must be at least ${min} characters`
        }
      });
    } else if (input.value.trim().length > max) {
      this.setState({
        ...this.state,
        [input.key]: {
          ...input,
          errorMsg: `${input.key} must be at least ${max} characters`
        }
      });
    } else {
      this.setState({
        ...this.state,
        [input.key]: {
          ...input,
          errorMsg: `success`
        }
      });
    }
  }

  checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value.trim()).toLowerCase())) {
      this.setState({
        ...this.state,
        [input.key]: {
          ...input,
          errorMsg: `success`
        }
      });
    } else {
      this.setState({
        ...this.state,
        [input.key]: {
          ...input,
          errorMsg: `Email is not valid`
        }
      });
    }
  }

  checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
      this.setState({
        ...this.state,
        [input2.key]: {
          ...input2,
          errorMsg: `Password do not match`
        }
      });
    }
  }

  focusInput() {
    const input = document.getElementById(this.state.focus.id);
    input.focus();
    input.selectionStart = this.state.focus.position;
  }

  render() {
    const { username, email, password, confirmPassword } = this.state;

    const getClassName = input => {
      let className = '';
      if (input.errorMsg === '') {
        className = 'form-control';
      } else if (input.errorMsg === 'success') {
        className = 'form-control success';
      } else {
        className = 'form-control error';
      }
      return className;
    };

    const template = `
      <form class="form" id="form">
        <h2 class="form-title">Register With Us</h2>
        <div class="${getClassName(username)}">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" value="${
            username.value
          }" />
          <small>${username.errorMsg}</small>
        </div>
        <div class="${getClassName(email)}">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" value="${
            email.value
          }" />
          <small>${email.errorMsg}</small>
        </div>
        <div class="${getClassName(password)}">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" value="${
            password.value
          }" />
          <small>${password.errorMsg}</small>
        </div>
        <div class="${getClassName(confirmPassword)}">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter password again"
            value="${confirmPassword.value}"
          />
          <small>${confirmPassword.errorMsg}</small>
        </div>
        <button type="submit" class="btn-submit">Submit</button>
      </form>
    `;
    this.el.innerHTML = template;
    this.bindEvents();
    this.focusInput();
  }
}

const app = new App();
app.render();

// ===========================================================================

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   checkRequired([username, email, password, password2]);
//   checkLength(username, 3, 15);
//   checkLength(password, 6, 25);
//   checkEmail(email);
//   checkPasswordMatch(password, password2);
// });

// const showError = (input, message) => {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector('small');
//   small.textContent = message;
//   formControl.classList.remove('success');
//   formControl.classList.add('error');
// };

// const showSuccess = input => {
//   const formControl = input.parentElement;
//   formControl.classList.remove('error');
//   formControl.classList.add('success');
// };

// const checkRequired = inputList => {
//   inputList.forEach(input => {
//     const formControl = input.parentElement;
//     const label = formControl.querySelector('label');
//     if (input.value.trim() === '') {
//       showError(input, `${label.textContent} is required`);
//     } else {
//       showSuccess(input);
//     }
//   });
// };

// const checkLength = (input, min, max) => {
//   const formControl = input.parentElement;
//   const label = formControl.querySelector('label');
//   if (input.value.trim().length < min) {
//     showError(input, `${label.textContent} must be at least ${min} characters`);
//   } else if (input.value.trim().length > max) {
//     showError(
//       input,
//       `${label.textContent} must be less than ${max} characters`
//     );
//   } else {
//     showSuccess(input);
//   }
// };

// const checkEmail = input => {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (re.test(String(input.value.trim()).toLowerCase())) {
//     showSuccess(input);
//   } else {
//     showError(input, `Email is not valid`);
//   }
// };

// const checkPasswordMatch = (input1, input2) => {
//   if (input1.value !== input2.value) {
//     showError(input2, `Password do not match`);
//   }
// };
