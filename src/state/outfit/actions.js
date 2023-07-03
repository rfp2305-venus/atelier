/* eslint-disable func-style */
import { fetchProduct } from '../../util/api.js';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export function wearArticle(productID) {

  return (dispatch) => {
    fetchProduct(productID)
      .then((product) => {
        dispatch(handleAddArticle(product));

      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function removeArticle(article) {
  return {
    type: REMOVE_ARTICLE,
    article
  };
}

export default function handleAddArticle(article) {
  return {
    type: ADD_ARTICLE,
    article
  };
}
