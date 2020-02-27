'use strict';

const App = () => {
  const [state, setState] = React.useState({
    inputs: {
      username: {
        key: 'username',
        value: '',
        error: ''
      },
      email: {
        key: 'email',
        value: '',
        error: ''
      },
      password: {
        key: 'password',
        value: '',
        error: ''
      },
      confirmPassword: {
        key: 'confirmPassword',
        value: '',
        error: ''
      }
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleInputChange = e => {
    checkRequire(e.target.id, e.target.value);
    if (e.target.id === 'username')
      checkLength(e.target.id, e.target.value, 4, 15);
    if (e.target.id === 'password')
      checkLength(e.target.id, e.target.value, 6, 25);
    if (e.target.id === 'email') checkEmail(e.target.id, e.target.value);
    if (e.target.id === 'confirmPassword')
      checkPasswordMatch(e.target.id, e.target.value);
  };

  const checkRequire = (inputKey, inputValue) => {
    if (inputValue.trim().length !== 0) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'success'
          }
        }
      });
    } else {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: `${inputKey} is required`
          }
        }
      });
    }
  };

  const checkLength = (inputKey, inputValue, min, max) => {
    if (inputValue.trim().length < min) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: `${inputKey} must be at least ${min} characters`
          }
        }
      });
    } else if (inputValue.trim().length > max) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: `${inputKey} must be less than ${max} characters`
          }
        }
      });
    } else {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'success'
          }
        }
      });
    }
  };

  const checkEmail = (inputKey, inputValue) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(inputValue.trim()).toLowerCase())) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'success'
          }
        }
      });
    } else {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'Email is not valid'
          }
        }
      });
    }
  };

  const checkPasswordMatch = (inputKey, inputValue) => {
    if (state.inputs['password'].value !== inputValue) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'Password do not match'
          }
        }
      });
    } else {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            value: inputValue,
            error: 'success'
          }
        }
      });
    }
  };

  const getClassName = input => {
    let className = '';
    if (input.error === '') {
      className = 'form-control';
    } else if (input.error === 'success') {
      className = 'form-control success';
    } else {
      className = 'form-control error';
    }
    return className;
  };

  return (
    <form className="form" id="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Register With Us</h2>
      <div className={getClassName(state.inputs.username)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={state.inputs.username.value}
          onChange={handleInputChange}
        />
        <small>{state.inputs.username.error}</small>
      </div>
      <div className={getClassName(state.inputs.email)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          value={state.inputs.email.value}
          onChange={handleInputChange}
        />
        <small>{state.inputs.email.error}</small>
      </div>
      <div className={getClassName(state.inputs.password)}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={state.inputs.password.value}
          onChange={handleInputChange}
        />
        <small>{state.inputs.password.error}</small>
      </div>
      <div className={getClassName(state.inputs.confirmPassword)}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter password again"
          value={state.inputs.confirmPassword.value}
          onChange={handleInputChange}
        />
        <small>{state.inputs.confirmPassword.error}</small>
      </div>
      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
};

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App), domContainer);
