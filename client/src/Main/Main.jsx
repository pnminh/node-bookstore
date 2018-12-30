import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
export class Main extends Component {
  render() {
    return (
      <div>
        <main className="container">
          {/* <!-- Jumbotron Header --> */}
          <header className="jumbotron my-4">
            <h1 className="display-3">Welcome to Bloccit</h1>
            <p className="lead">An application for users to share information.</p>
            <a href="/sign_up" className="btn btn-primary btn-lg">
              Sign up
            </a>
          </header>

          {/* <!-- Page Features --> */}
          <section className="row text-center">
            <section className="col-lg-4">
              <h4 className="card-title">Post</h4>
              <p className="card-text">
                Share your thoughts about subjects that are important to you.
              </p>
            </section>

            <section className="col-lg-4">
              <h4 className="card-title">Comment</h4>
              <p className="card-text">
                Your opinion counts! But you have to make yourself heard first!
              </p>
            </section>

            <section className="col-lg-4">
              <h4 className="card-title">Stay Informed</h4>
              <p className="card-text">
                See the most active topics as well as trending subjects every
                day!
              </p>
            </section>
          </section>
          {/* <!-- /.row --> */}
        </main>
      </div>
    );
  }
}
