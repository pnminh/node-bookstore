import React, { Component } from 'react';
import Formsy from 'formsy-react';
import FormInput from '../Components/FormInput';
import { Redirect } from 'react-router-dom';
export class SignIn extends Component {
  constructor() {
    super();
    this.state = { canSubmit: false };
  }
  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };
  render() {
    if (this.props.users.id) {
      return <Redirect to='/books' />;
    }
    return (
      <div className="container">
        <h1>Sign in</h1>
        <Formsy
          onSubmit={data => this.props.signIn(data)}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <FormInput
            type="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            title="Email"
            validations="isEmail"
            validationError="Email must be valid"
            describedByText="email address must be a valid address"
            required
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Enter password"
            title="Password"
            validations="minLength:6"
            validationError="Password must be longer than 6 characters"
            required
          />
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className="btn btn-primary"
          >
            Sign in
          </button>
        </Formsy>
      </div>
    );
  }
}
