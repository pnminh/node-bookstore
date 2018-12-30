import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Main } from './Main/Main';
import { About } from './About/About';
import { BookList } from './BookList/BookList';
import { History } from './History/History';
import { Admin } from './Admin/Admin';
import { SignIn } from './Users/SignIn';
import { SignUp } from './Users/SignUp';
import * as axios from 'axios';
const url = '/api/books';
class App extends Component {
  constructor() {
    super();
    this.state = {
      books: {
        listView: true,
        books: [],
        pagination: { count: 10, page: 1, total: 0 },
        searchTerm: ''
      }
    };
  }
  componentDidMount() {
    this.loadBooks();
  }
  loadBooks = () => {
    let params = `?_page=${this.state.books.pagination.page}&_limit=${
      this.state.books.pagination.count
    }`;
    if (this.state.books.searchTerm) {
      params += `&title_like=${this.state.books.searchTerm}`;
    }
    axios.get(url + params).then(response => {
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
    });
  };
  listView = () => {
    this.setState({ books: { ...this.state.books,listView: true } });
  };
  gridView = () => {
    this.setState({ books: { ...this.state.books,listView: false } });
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
      </div>
    );
  }
}

export default App;
