import React from 'react';
import Form from '../src/Form';
import { hot } from 'react-hot-loader';

const validateRules = (values) => {
  const err = {};
  const { name, age, married } = values;

  if (name === '') {
    err.name = 'Name required'
  }
  if (age < 18) {
    err.age = 'Must be 18 or older'
  }
  if (!married) {
    err.married = 'Must be married'
  }

  return err;
};

class FormStateExample extends React.Component {

  state = {
    name: 'John',
    age: 15,
    married: false
  };

  onSubmitSuccess = (values) => {

  };

  render() {
    return (
      <Form values={this.state} validate={validateRules} onSubmitSuccess={this.onSubmitSuccess}>
        {form => (
          <div>
            <input type="text" value={form.input.name} />
            <input type="text" value={form.input.age} />
            <input type="text" value={form.input.married} />
            <button type="submit">Send</button>
          </div>
        )}
      </Form>
    )
  }
}

export default hot(module)(FormStateExample);
