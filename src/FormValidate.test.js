import { mount } from 'enzyme';
import React from 'react';
import Form from './FormValidate';

describe('FormValidate', () => {
  const validate = (values) => {
    const err = {};
    const { name } = values;
    if (name === '') {
      err.name = 'Nome obrigatório';
    }
    return err;
  };

  const formMount = (values = { name: '' }) => {
    const options = {
      values,
      validate,
    };

    return mount(
      <Form {...options}>
        {form => (
          <div>
            <input name="name" type="text" value={form.input.name} readOnly />
            <span>{form.errors.name}</span>
            <button type="submit" onClick={form.handleSubmit} />
          </div>
        )}
      </Form>,
    );
  };

  it('set initial form value"', () => {
    const component = formMount({ name: 'José' });

    expect(component.find('input').props().value).toEqual('José');
  });

  it('show error message on submit"', () => {
    const component = formMount({ name: '' });

    component.find('button').simulate('click');
    expect(component.find('span').text()).toEqual('Nome obrigatório');
  });

  it('clear error message on submit"', () => {
    const component = formMount({ name: '' });

    component.find('button').simulate('click');
    expect(component.find('span').text()).toEqual('Nome obrigatório');

    component.setProps({ values: { name: 'José' } });
    component.find('button').simulate('click');

    expect(component.find('span').text()).toEqual('');
  });
});
