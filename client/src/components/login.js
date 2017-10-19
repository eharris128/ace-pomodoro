import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUserRequest, updateCredentials } from '../actions/actions';

import './styles/login.css';

export class LogIn extends React.Component {
  loginSubmit(event) {
    event.preventDefault();
    if ((this.props.seconds !== 0 && this.props.minutes !== 0) || this.props.seconds !== 0) {
      this.props.history.push('/work-timer');
    } else if (this.props.seconds === 0 && this.props.minutes === 0) {
      this.props.history.push('/set-pomo');
    }
    
    const username = this.username.value;
    const password = this.password.value;

    const credentials = `${username}:${password}`;
    const encodedAuthHeader = btoa(credentials);
    window.encodedAuthHeader = encodedAuthHeader;

    this.props.dispatch(updateCredentials(username, password));
    this.props.dispatch(loginUserRequest());
  }

  demoLogin() {
    if ((this.props.seconds !== 0 && this.props.minutes !== 0) || this.props.seconds !== 0) {
      this.props.history.push('/work-timer');
    } else if (this.props.seconds === 0 && this.props.minutes === 0) {
      this.props.history.push('/set-pomo');
    }
    let username = this.props.username ? this.props.username : 'username';
    let password =  this.props.password ? this.props.password : 'password';
    const credentials = `${username}:${password}`;
    const encodedAuthHeader = btoa(credentials);
    window.encodedAuthHeader = encodedAuthHeader;
    this.props.dispatch(updateCredentials(username, password));
  }

  render() {
    return (
      <div className="login">
        <button onClick={() => this.demoLogin()}>Demo</button>
        <h2>Login</h2>
        <form className="login-form" onSubmit={e => this.loginSubmit(e)}>
          <input
            aria-label="username"
            id="username"
            type="text"
            placeholder="username"
            className="input-login"
            required
            ref={input => (this.username = input)}
          />
          <input
            aria-label="password"
            id="password"
            type="password"
            placeholder="password"
            className="input-login"
            required
            ref={input => (this.password = input)}
          />
          <button type="submit" className="login-button">login</button>
        </form>
        <span className="create-account-span">
          <Link to="/create-user" className="create-account-link">create user</Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  minutes: state.sessionMinutesRemaining,
  seconds: state.sessionSecondsRemaining,
  username: state.username,
  password: state.password
});

export default connect(mapStateToProps)(LogIn);



// const mapStateToProps = state => ({
//   sessions: state.sessions,
//   loading: state.loading,
//   error: state.error,
//   username: state.username,
//   password: state.password
// });

// export default connect(mapStateToProps)(UserData);
