import _omit from 'lodash/omit';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import React, { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import autobind from 'autobind-decorator';

@autobind
class FormValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      values: {},
      validateErrors: {},
      changedInputs: [],
    };
    this.previousRemoteErrors = {};
    this.remoteErrors = {};
  }

  static getDerivedStateFromProps(nextProps, state) {
    const npInitialValues = nextProps.values;
    if (npInitialValues !== null && Object.keys(npInitialValues).length > 0 &&
        !_isEqual(npInitialValues, state.values)) {
      return { input: npInitialValues, values: npInitialValues };
    }
    if (npInitialValues === null) {
      // clear validation messages
      return { validateErrors: {}, changedInputs: [], input: {} };
    }

    return state;
  }

  setErrors(validateErrorsNext) {
    this.remoteErrors = Object.assign({}, this.remoteErrors, validateErrorsNext);
  }

  handleChange(e) {
    const element = e.target;
    const value = element.value;
    const name = element.getAttribute('name');
    if (name) {
      this.setState({
        input: {
          ...this.state.input,
          [name]: value,
        },
      }, () => {
        if (typeof (this.props.validate) === 'function') {
          this.validateInput(name, this.props.validate);
        }
      });
    } else {
      throw new Error('FormValidate: Input element should provide a valid name attribute');
    }
  }

  validateComponent(validate) {
    const errors = validate(this.state.input, this.setErrors);
    this.setState({
      validateErrors: errors,
    });
    return Object.keys(errors).length === 0; // true is valid
  }

  validateInput(name, validate) {
    const errors = validate(this.state.input, this.setErrors);
    let validateErrors = Object.assign({}, this.state.validateErrors, this.remoteErrors);
    if (!errors[name]) {
      validateErrors = _omit(validateErrors, name);
    } else {
      validateErrors[name] = errors[name];
    }
    // validate remote errors
    if (!_isEqual(this.previousRemoteErrors, this.remoteErrors)) {
      validateErrors = _omit(validateErrors, Object.keys(this.previousRemoteErrors));
    }
    this.setState({
      validateErrors,
    });
    this.previousRemoteErrors = this.remoteErrors;
    this.remoteErrors = {};
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateComponent(this.props.validate)) {
      this.props.onSubmitSuccess(this.state.input);
    } else {
      this.props.onSubmitError(this.state.input, this.state.validateErrors);
    }
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { input, validateErrors } = this.state;

    return (
      <Fragment>
        {this.props.children({
          handleChange,
          handleSubmit,
          input,
          errors: validateErrors,
        })}
      </Fragment>);
  }
}

FormValidate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  values: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  children: PropTypes.func,
  validate: PropTypes.func,
};

FormValidate.defaultProps = {
  values: {},
  onSubmitSuccess: () => {},
  onSubmitError: () => {},
  validate: null,
  children: null,
};

export default FormValidate;
