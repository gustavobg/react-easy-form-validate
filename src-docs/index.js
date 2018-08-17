import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import IntroductionMd from './intro.md';
import Form from '../src/FormValidate';

ReactDOM.render(
  <Catalog
    title="EZ React Form Validate"
    pages={[
      {
        path: '/', // The path where the page can be accessed
        title: 'Basic Example', // The page title
        component: IntroductionMd,
        imports: { Form },
      },
      // Other pages …
    ]}
  />,
  document.getElementById('app'),
);

module.hot.accept();
