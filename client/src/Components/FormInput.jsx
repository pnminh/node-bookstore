import React from 'react';
import { propTypes, withFormsy } from 'formsy-react';
/**
 * check validations on https://www.npmjs.com/package/validator
 */
class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    this.props.setValue(
      event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']
    );
  }

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = `form-group ${this.props.className} ${
      this.props.showRequired() ? 'required' : ''
    } ${this.props.showError() ? 'error' : ''}`;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        {(() => {
          if (this.props.describedByText && this.props['aria-describedby'])
            return (
              <sup>
                <i
                  id={this.props['aria-describedby']}
                  className="fa fa-info-circle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title={this.props.describedByText}
                />
              </sup>
            );
        })()}
        <input
          className="form-control"
          onChange={this.changeValue}
          name={this.props.name}
          type={this.props.type || 'text'}
          value={this.props.getValue() || ''}
          placeholder={this.props.placeholder || ''}
        />
        {(() => {
          if (errorMessage) {
            return <div className="text-danger">{errorMessage}</div>;
          }
        })()}
      </div>
    );
  }
}

FormInput.propTypes = {
  ...propTypes
};

export default withFormsy(FormInput);
