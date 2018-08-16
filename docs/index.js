import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import IntroductionMd from './intro.mdx';
import Form from '../src/FormValidate';

ReactDOM.render(
  <Catalog
    title="My Catalog"
    pages={[
      {
        path: '/', // The path where the page can be accessed
        title: 'Introduction', // The page title
        component: IntroductionMd,
        imports: { Form },
      },
      // Other pages …
    ]}
  />,
  document.getElementById('app'),
);

module.hot.accept();
