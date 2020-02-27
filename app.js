'use strict';

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
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
  }

  handleInputChange(e) {
    const key = e.target.id;
    this.setState(
      {
        [key]: {
          ...this.state[key],
          value: e.target.value
        }
      },
      () => {
        this.validateInput(this.state[key]);
      }
    );
  }

  validateInput(input) {
    this.checkRequire(input);
    if (input.key === 'username') this.checkLength(input, 3, 15);
    if (input.key === 'password') this.checkLength(input, 6, 25);
    if (input.key === 'email') this.checkEmail(input);
    if (input.key === 'confirmPassword')
      this.checkPasswordMatch(this.state.password, input);
  }

  handleSubmit(e) {
    e.preventDefault();

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

  checkRequire(input) {
    if (input.value.trim().length === 0) {
      this.setState({
        [input.key]: {
          ...input,
          errorMsg: `${input.key} is required`
        }
      });
    } else {
      this.setState({
        [input.key]: {
          ...input,
          errorMsg: `success`
        }
      });
    }
  }

  checkLength(input, min, max) {
    if (input.value.trim().length < min) {
      this.setState({
        [input.key]: {
          ...input,
          errorMsg: `${input.key} must be at least ${min} characters`
        }
      });
    } else if (input.value.trim().length > max) {
      this.setState({
        [input.key]: {
          ...input,
          errorMsg: `${input.key} must be less than ${max} characters`
        }
      });
    } else {
      this.setState({
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
        [input.key]: {
          ...input,
          errorMsg: `success`
        }
      });
    } else {
      this.setState({
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
        [input2.key]: {
          ...input2,
          errorMsg: `Password do not match`
        }
      });
    }
  }

  getClassName(input) {
    let className = '';
    if (input.errorMsg === '') {
      className = 'form-control';
    } else if (input.errorMsg === 'success') {
      className = 'form-control success';
    } else {
      className = 'form-control error';
    }
    return className;
  }

  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <form className="form" id="form" onSubmit={this.handleSubmit.bind(this)}>
        <h2 className="form-title">Register With Us</h2>
        <div className={this.getClassName(username)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username.value}
            onChange={this.handleInputChange.bind(this)}
          />
          <small>{username.errorMsg}</small>
        </div>
        <div className={this.getClassName(email)}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={email.value}
            onChange={this.handleInputChange.bind(this)}
          />
          <small>{email.errorMsg}</small>
        </div>
        <div className={this.getClassName(password)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password.value}
            onChange={this.handleInputChange.bind(this)}
          />
          <small>{password.errorMsg}</small>
        </div>
        <div className={this.getClassName(confirmPassword)}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter password again"
            value={confirmPassword.value}
            onChange={this.handleInputChange.bind(this)}
          />
          <small>{confirmPassword.errorMsg}</small>
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);
