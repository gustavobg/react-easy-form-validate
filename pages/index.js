import React from 'react';
import { Catalog } from 'catalog';

const pages = [
  {
    path: '/',
    title: 'Welcome',
    component: require('./welcome.md'),
  },
];

export default () => (
  <div>
    <Catalog title="Catalog" pages={pages} />
  </div>
);
