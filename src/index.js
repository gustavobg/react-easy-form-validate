import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(Form);
