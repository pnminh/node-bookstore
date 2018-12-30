import React, { Component } from 'react';

export class SignIn extends Component {
  render() {
    return (
      <div className="container">
        <h1>Sign in</h1>

        <form action="/users/sign_in" method="post">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small className="text-muted" id="emailHelp">
              email address must be a valid address
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              aria-describedby="passwordHelp"
              placeholder="Enter password"
            />
            <small className="text-muted" id="passwordHelp">
              password must match confirmation below
            </small>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
