import React, { Component } from 'react';
import Formsy from 'formsy-react';
import FormInput from '../Components/FormInput';
export class SignUp extends Component {
  constructor() {
    super();
    this.state = { canSubmit: false };
  }
  submit = data => {
    console.log(JSON.stringify(data));
  };
  enableButton = ()=> {
    this.setState({ canSubmit: true });
  }

  disableButton = ()=> {
    this.setState({ canSubmit: false });
  }
  render() {
    return (
      <div className="container">
        <h1>Sign up</h1>

        <Formsy
          onSubmit={this.submit}
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
            aria-describedby="passwordHelp"
            placeholder="Enter password"
            title="Password"
            validations="minLength:6"
            validationError="Password must be longer than 6 characters"
            describedByText="password must match confirmation below"
            required
          />
          <FormInput
            type="password"
            name="passwordConfirmation"
            placeholder="Enter password confirmation"
            title="Password confirmation"
            validations={{
                minLength: 6,
                equalsField: 'password'
              }}
              validationErrors={{
                minLength: 'Password must be longer than 6 characters',
                equalsField: 'Confirmed password does not match'
              }}
            required
          />
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className="btn btn-primary"
          >
            Sign up
          </button>
        </Formsy>
      </div>
    );
  }
}