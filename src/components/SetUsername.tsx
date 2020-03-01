import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { CHANGE_USERNAME } from '../store';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUsername: (username: string) => {
    dispatch({
      type: CHANGE_USERNAME,
      username,
    });
  }
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type SetUsernameState = {
  username: string;
}

class SetUsername extends React.Component<PropsFromRedux, SetUsernameState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = { username: '' };
    this.handleChange = this.handleChange.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }

  changeUsername() {
    if (!this.props.setUsername) return;
    this.props.setUsername(this.state.username);
  }

  render() {
    return (
      <div className="username-container">
        <input
          placeholder="Username"
          className="username-input"
          onChange={this.handleChange} />
        <span
          className="username-button"
          onClick={this.changeUsername}>
          Set Username
        </span>
      </div>
    );
  }
}

export default connector(SetUsername);
