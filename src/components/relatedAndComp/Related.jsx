import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import aSimpleAction from '../../state/related/actions.js';

export default function Related() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('state', state);

  useEffect(()=>{
    dispatch(aSimpleAction());
  }, []);

  return (
    <>
      hello earthlings - from related
    </>
  );
}