import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductOverview from './ProductOverview.jsx';

export default function App() {
  const { loading } = useSelector(({ app }) => app);

  console.log(loading);
  return (
    <div id="app">
      {loading ? <h2>loading</h2> : null}
      <ProductOverview />
    </div>
  );
}