/* eslint-disable func-style */
import { fetchProduct } from '../../util/api.js';

export const ADD_ARTICLE = 'ADD ARTICLE';

export function wearArticle(productID) {
  console.log('wearArticle called with', productID);
  // createArticle(productID)
  return (dispatch) => {
    fetchProduct(productID)
      .then((article) => {
        dispatch(handleAddArticle(article));
        console.log('article', article);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default function handleAddArticle(article) {
  console.log('handleAddItem called');
  return {
    type: ADD_ARTICLE,
    payload: {
      id: 1,
      article
    }
  };
}
