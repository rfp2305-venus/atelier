import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './relatedStyles.css';
import aSimpleAction from '../../state/related/actions.js';

export default function RelatedComp() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('state', state);

  useEffect(()=>{
    dispatch(aSimpleAction());
  }, []);

  let relatedProducts = [];

  return (
    <>
      <div id="related-and-comp">
        <div>
          <RelatedProducts />
        </div>
        <div>
          <YourOutfit />
        </div>
      </div>
    </>
  );
}