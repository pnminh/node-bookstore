import React, { Component } from 'react';
export class Admin extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-md-6 card">
            <form className="form-horizontal">
              <fieldset>
                <legend className="text-center">Upload Book</legend>
                <div className="form-group">
                  <label className="col-md-3 control-label" htmlFor="title">
                    Title
                  </label>
                  <div className="col-md-9">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Tittle"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-3 control-label" htmlFor="isbn">
                    Isbn
                  </label>
                  <div className="col-md-9">
                    <input
                      id="isbn"
                      name="isbn"
                      type="text"
                      placeholder="Isbn"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" htmlFor="isbn">
                    Isbn 13
                  </label>
                  <div className="col-md-9">
                    <input
                      id="isbn"
                      name="isbn"
                      type="text"
                      placeholder="Isbn 13"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-3 control-label" htmlFor="image">
                    Cover Picture
                  </label>
                  <div className="col-md-9">
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      name="image"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    className="col-md-3 control-label"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className="col-md-9">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="."
                      rows="5"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-7 text-right">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Submit
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="col-md-5 card">
            <legend className="text-center">Preview</legend>
          </div>
        </div>
      </div>
    );
  }
}
