import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';

ReactDOM.render(
  <Catalog
    title="My Catalog"
    pages={[
      {
        path: '/', // The path where the page can be accessed
        title: 'Introduction', // The page title
        content: require('Intro'), // The documentation component
      },
      // Other pages …
    ]}
  />,
  document.getElementById('app'),
);
