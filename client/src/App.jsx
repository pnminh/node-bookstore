import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Main } from './Main/Main';
import { About } from './About/About';
import { BookList } from './BookList/BookList';
import { History } from './History/History';
import { Admin } from './Admin/Admin';
import { SignIn } from './Users/SignIn';
import { SignUp } from './Users/SignUp';
import { Notification } from './Notification/Notification';
import * as axios from 'axios';
const booksApiUrl = '/api/books';
const usersApiUrl = '/api/users';
class App extends Component {
  constructor() {
    super();
    this.state = {
      books: {
        listView: true,
        books: [],
        pagination: { count: 10, page: 1, total: 0 },
        searchTerm: ''
      },
      serverError: {
        statusCode: 0,
        message: null
      },
      users: {
        id: null,
        email: null
      },
      redirectTo: ''
    };
  }
  componentDidMount() {
    this.loadBooks();
  }
  callServer = (url, method, data, callback, errorCallback) => {
    const options = {
      method: method,
      headers: { 'content-type': 'application/json' },
      data,
      url
    };
    axios(options)
      .then(callback)
      .catch(errorCallback);
  };
  signInSignUpService(isSignIn, data) {
    let url = usersApiUrl;
    if (isSignIn) {
      url += '/sign_in';
    }
    this.callServer(
      url,
      'post',
      data,
      response => {
        console.log(`sign in response:${response}`);
        this.setState({
          users: { id: response.data.user.id, email: response.data.user.email },
          redirectTo: '/books'
        });
      },
      error => {
        this.logOut();
        this.handleServerError(error.response);
      }
    );
  }
  signIn = data => {
    console.log('signing in');
    this.signInSignUpService(true, data);
  };
  signUp = data => {
    this.signInSignUpService(false, data);
  };
  renderRedirect() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
  }
  loadBooks = () => {
    let params = `?_page=${this.state.books.pagination.page}&_limit=${
      this.state.books.pagination.count
    }`;
    if (this.state.books.searchTerm) {
      params += `&title_like=${this.state.books.searchTerm}`;
    }
    this.callServer(
      booksApiUrl + params,
      'get',
      null,
      response => {
        this.setState({
          books: {
            ...this.state.books,
            books: response.data,
            pagination: {
              ...this.state.books.pagination,
              total: +response.headers['x-total-count']
            }
          }
        });
      },
      error => {
        this.handleServerError(error.response);
      }
    );
  };
  logOut() {
    this.setState({ users: { id: null, email: null } });
  }
  handleServerError = response => {
    if (400 <= +response.status) {
      if (401 === +response.status) {
        console.log('redirect to sign in');
      } else {
        this.setState(
          {
            serverError: {
              statusCode: +response.status,
              message: response.data.error
            }
          },
          () => {
            setTimeout(() => {
              this.setState({
                serverError: {
                  statusCode: null,
                  message: null
                }
              });
            }, 3000);
          }
        );
      }
      return true;
    }
    return false;
  };
  listView = () => {
    this.setState({ books: { ...this.state.books, listView: true } });
  };
  gridView = () => {
    this.setState({ books: { ...this.state.books, listView: false } });
  };
  handlePageClick = data => {
    this.setState(
      {
        books: {
          ...this.state.books,
          pagination: {
            ...this.state.books.pagination,
            page: data.selected + 1
          }
        }
      },
      this.loadBooks
    );
  };
  handleSearchInput = event => {
    this.setState(
      {
        books: {
          ...this.state.books,
          searchTerm: event.target.value,
          pagination: { ...this.state.books.pagination, page: 1 }
        }
      },
      this.loadBooks
    );
  };
  render() {
    return (
      <div>
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
                    {(() => {
                      if (!this.state.users.id) {
                        return (
                          <Fragment>
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
                          </Fragment>
                        );
                      }
                    })()}
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
            <Route
              exact
              path="/sign_in"
              render={props => <SignIn {...props} users={this.state.users} signIn={this.signIn} />}
            />
            <Route
              exact
              path="/sign_up"
              render={props => <SignUp {...props} users={this.state.users} signUp={this.signUp} />}
            />
            <Route path="/about" component={About} />
            <Route
              path="/books"
              render={props => (
                <BookList
                  {...props}
                  listView={this.listView}
                  gridView={this.gridView}
                  loadBooks={this.loadBooks}
                  handlePageClick={this.handlePageClick}
                  handleSearchInput={this.handleSearchInput}
                  booksProp={this.state.books}
                />
              )}
            />
            <Route path="/admin" component={Admin} />
            <Route path="/history" component={History} />
          </div>
        </Router>
        <Notification serverError={this.state.serverError} />
      </div>
    );
  }
}

export default App;
