/* eslint-disable func-style */
import { fetchProduct } from '../../util/api.js';

export const ADD_ARTICLE = 'ADD_ARTICLE';

export function wearArticle(productID) {
  // console.log('wearArticle called with', productID);
  // createArticle(productID)
  return (dispatch) => {
    fetchProduct(productID)
      .then((product) => {
        dispatch(handleAddArticle(product));
        // console.log('product/article', product);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default function handleAddArticle(article) {
  // console.log('handleAddItem called');
  return {
    type: ADD_ARTICLE,
    article
  };
}
