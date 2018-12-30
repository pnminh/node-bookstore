import React, { Component } from 'react';

export class About extends Component {
  render() {
    return <div>
        <main className="container">
          {/* <!-- Jumbotron Header --> */}
          <header className="jumbotron my-4">
            <h1 className="display-3">About Us</h1>
            <p className="lead">Information about us</p>
            <a href="#" className="btn btn-primary btn-lg">
              Thank you
            </a>
          </header>
        </main>
      </div>;
  }
}
