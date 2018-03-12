import React, { Fragment } from 'react';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

const validateComponent = (context, validate) => {
  const errors = validate(context.state.input, context.setErrors);
  context.setState({
    validateErrors: errors
  });
  return Object.keys(errors).length === 0; // true is valid
};

const validateInput = (context, name, validate) => {
  const errors = validate(context.state.input, context.setErrors);
  let validateErrors = Object.assign({}, context.state.validateErrors, context.remoteErrors);
  if (!errors[name]) {
    validateErrors = _omit(validateErrors, name);
  } else {
    validateErrors[name] = errors[name];
  }
  // validate remote errors
  if (!_isEqual(context.previousRemoteErrors, context.remoteErrors)) {
    validateErrors = _omit(validateErrors, Object.keys(context.previousRemoteErrors));
  }
  context.setState({
    validateErrors
  });
  context.previousRemoteErrors = context.remoteErrors;
  context.remoteErrors = {};
};

// WrappedClass,
//   config = {
//     validate: {},
//     propNamespace: 'input',
//     propInitialValues: 'initialValues'
//   }) => {

// const ns = config.propNamespace && config.propNamespace.length > 1 ? config.propNamespace : 'form';
// const initialValues = config.propInitialValues && config.propInitialValues.length > 1 ? config.propInitialValues : 'initialValues';




class Form extends React.Component {

  state = {
    input: {},
    initialValues: {},
    validateErrors: {},
    changedInputs: []
  };

  previousRemoteErrors = {};
  remoteErrors = {};
  setErrors = (validateErrorsNext) => {
    // let validateErrorsBefore = this.state.validateErrors;
    const remoteErrors = Object.assign({}, this.remoteErrors, validateErrorsNext);
    this.remoteErrors = remoteErrors;
    // return Object.assign({}, currentErrors, validateErrorsNext);
  };

  componentWillReceiveProps(nextProps) {
    const npInitialValues = nextProps.initialValues;
    if (npInitialValues !== null && Object.keys(npInitialValues).length > 0 && !_isEqual(npInitialValues, this.state.initialValues)) {
      this.setState({ input: npInitialValues, initialValues: npInitialValues });
    }
    if (npInitialValues === null) {
      // clear validation messages
      this.setState({ validateErrors: {}, changedInputs: [], input: {} });
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
  });
    // setStateMerge(value, name, this);
  };

  onChangeInput = (name, value) => {
    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    }, () => {
      validateInput(this, name, config.validate, ns);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateComponent(this, config.validate, ns)) {
      this.props.onSubmitSuccess(this.state.input);
    } else {
      this.props.onSubmitError(this.state.input, this.state.validateErrors);
    }
  };

  render() {
    const onChangeInput = this.onChangeInput;
    const handleSubmit = this.handleSubmit;

    return (
      <Fragment>
        {this.props.children({
          ...this.state,
          onChangeInput,
          handleSubmit,
          input: this.state.input,
          validateErrors: this.state.validateErrors
        })}
      </Fragment>)
  }
}

export default Form;
