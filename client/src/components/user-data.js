import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSessions } from '../actions/actions';
// import Spinner from 'react-spinkit';

import './styles/user-data.css';

export class UserData extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      fetchSessions(this.props.username, this.props.password)
    );
  }

  renderResults() {
    if (this.props.loading) {
      return <div className="loading-message">Loading Sessions...</div>;
    }

    if (this.props.error) {
      return (
        <strong>
          {this.props.error}
        </strong>
      );
    }

    if (this.props.sessions.sessionInfo) {
      const sessionData = this.props.sessions.sessionInfo.map((item, index) =>
        <tr key={index}>
          <th>
            <Link to={`/set-pomo/${item.name}`}>
              {item.name}
            </Link>
          </th>
          <th>
            {item.work_duration.minutes} minutes, {item.work_duration.seconds ? item.work_duration.seconds : 0}{' '}
            seconds
          </th>
          <th>
            {item.break_duration.minutes} minutes, {item.break_duration.seconds ? item.break_duration.seconds : 0}{' '}
            seconds
          </th>
        </tr>
      );

      return (
        <div>
          <div className="single-session-container">
            <table className="session-result">
              <thead>
                <tr>
                  <th>Saved sessions</th>
                  <th>Set work time</th>
                  <th>Set break time</th>
                </tr>
              </thead>
              <tbody>
                {sessionData}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="user-data">
        <div className="user-sessions-container">
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sessions: state.sessions,
  loading: state.loading,
  error: state.error,
  username: state.username,
  password: state.password
});

export default connect(mapStateToProps)(UserData);
