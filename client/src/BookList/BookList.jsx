import './BookList.css';

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

export class BookList extends Component {
  getFirst100Words = words => {
    let wordTokens = words.split(' ');
    if (wordTokens.length > 50) {
      return wordTokens.slice(0, 50).join(' ') + '...';
    }
    return words;
  };
  render() {
    let renderedBookList = this.props.booksProp.books.map((book, id) => {
      return (
        <div
          className={`item col-xs-4 col-lg-4 ${
            this.props.booksProp.listView
              ? 'list-group-item'
              : 'grid-group-item'
          }`}
          key={id}
        >
          <div className="thumbnail card">
            <div className="img-event">
              <img
                className="group list-group-image img-fluid"
                src={book.image_url}
                alt=""
              />
            </div>
            <div className="caption card-body title">
              <h4 className="group card-title inner list-group-item-heading">
                {book.title}
              </h4>
              <p className="group inner list-group-item-text">
                Author:
                <span>{book.authors}</span>
              </p>
            </div>
            <div className="caption card-body body">
              <p className="group inner list-group-item-text">
                {this.getFirst100Words(book.description)}
              </p>
            </div>
            <div className="caption card-body">
              <div className="row justify-content-start">
                <div
                  className={`${
                    this.props.booksProp.listView ? 'col-lg-2' : 'col-sm-5'
                  }`}
                >
                  <button
                    className="btn btn-lg btn-outline-primary bg-color fs-it-btn text-uppercase"
                    type="button"
                  >
                    Get Info
                  </button>
                </div>
                <div
                  className={`${
                    this.props.booksProp.listView ? 'col-lg-2' : 'col-sm-6'
                  }`}
                >
                  <button
                    className="btn btn-lg btn-outline-secondary bg-color fs-it-btn text-uppercase"
                    type="button"
                  >
                    <i className="fa fa-shopping-cart" />
                    <span className="fs-it-btn-vertical-line" />
                    {`$${book.price}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <hr />
        <div className="container">
          <div className="row">
            <h2>Our current bookstore</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 my-3">
              <div className="pull-right">
                <div className="btn-group">
                  <button
                    className="btn btn-info"
                    id="list"
                    onClick={this.props.listView}
                  >
                    List View
                  </button>
                  <button
                    className="btn btn-danger"
                    id="grid"
                    onClick={this.props.gridView}
                  >
                    Grid View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-9">
              <ReactPaginate
                containerClassName="pagination col-md-5"
                breakClassName="page-item"
                breakLabel={<span className="page-link">...</span>}
                pageClassName="page-item"
                activeClassName="active"
                activeLinkClassName="disabled"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                pageCount={
                  this.props.booksProp.pagination.total /
                  this.props.booksProp.pagination.count
                }
                initialPage={this.props.booksProp.pagination.page - 1}
                forcePage={this.props.booksProp.pagination.page - 1}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={this.props.handlePageClick}
              />
            </div>
            <div className="input-group col-md-3">
              <input
                className="form-control"
                type="search"
                value={this.props.booksProp.searchTerm}
                id="example-search-input"
                onChange={this.props.handleSearchInput}
              />
              <span className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
          </div>
          <hr />
          <div id="books" className="row view-group">
            {renderedBookList}
          </div>
        </div>
      </div>
    );
  }
}
