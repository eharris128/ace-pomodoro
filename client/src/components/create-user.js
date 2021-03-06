import React from "react";
import { connect } from "react-redux";
import "./styles/create-user.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createUserRequest } from "../actions/actions";

export class CreateUser extends React.Component {
  createUserForm(event) {
    event.preventDefault();
    if (
      (this.props.seconds !== 0 && this.props.minutes !== 0) ||
      this.props.seconds !== 0
    ) {
      this.props.history.push(`/work-timer`);
    } else if (this.props.seconds === 0 && this.props.minutes === 0) {
      this.props.history.push(`/set-pomo`);
    }
    this.props.dispatch(createUserRequest());
  }

  render() {
    return (
      <div className="login">
        <h2>create user</h2>
        <form onSubmit={e => this.createUserForm(e)}>
          <input aria-label="create username" id="createUsername" type="text" placeholder="username" />
          <input aria-label="create passwrod" id="createPassword" type="password" placeholder="password" />
          <button type="submit" className="create-user-button">create</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  minutes: state.sessionMinutesRemaining,
  seconds: state.sessionSecondsRemaining
});
export default connect(mapStateToProps)(CreateUser);
