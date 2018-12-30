import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Main } from '../Main/Main';
import { About } from '../About/About';
import { BookList } from '../BookList/BookList';
import { History } from '../History/History';
import { Admin } from '../Admin/Admin';
import { SignIn } from '../Users/SignIn';
import { SignUp } from '../Users/SignUp';
export class NavBar extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
              <a className="navbar-brand" href="index#">
                Book Store
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign_in">
                      Sign in
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign_up">
                      Sign up
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/books">
                      Books
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/history">
                      History
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About Us
                    </Link>
                    <span className="sr-only">(current)</span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Route exact path="/" component={Main} />
          <Route exact path="/sign_in" component={SignIn} />
          <Route exact path="/sign_up" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/books" component={BookList} />
          <Route path="/admin" component={Admin} />
          <Route path="/history" component={History} />
        </div>
      </Router>
    );
  }
}
