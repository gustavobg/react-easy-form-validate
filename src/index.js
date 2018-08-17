import React from 'react';
import ReactDOM from 'react-dom';
import FormValidate from './FormValidate';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app'),
  );
};

render(FormValidate);

module.hot.accept();
