import React, { Component } from 'react';

export class Notification extends Component {
  render() {
    if (this.props.serverError.message) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Error: {`${this.props.serverError.statusCode}: `}
          {this.props.serverError.message}
        </div>
      );
    }
    return null;
  }
}
