import React, { Component } from 'react';

export class History extends Component {
  render() {
    return (
      <div>
        <hr />
        <div className="container">
          <div className="row">
            <h2>Welcome, Mai</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 my-3">
              <div className="pull-right">
                <div className="btn-group">
                  <button
                    className="btn btn-info"
                    id="list"
                    onClick={this.listView}
                  >
                    Purchase History
                  </button>
                  <button
                    className="btn btn-danger"
                    id="grid"
                    onClick={this.gridView}
                  >
                    Recent Purchases
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
