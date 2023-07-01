/* eslint-disable func-style */

import { fetchProduct } from '../../util/api.js';
import { handleSetLoading } from '../app/actions.js';

export const ADD_ARTICLE = 'ADD ARTICLE';

function findArticle(productID) {
  //axios call to get category, name, price, and star rating
  return axios({
    method: 'get',
    url: `${API_URL}/products/${productID}`,
    headers: {
      Authorization: API_KEY
    }
  }).then(response => {
    setProduct(response.data);
    return response.data;
  }).catch(error => {
    console.log('error', error);
  });
}

function findPhoto(productID) {
  return axios({
    method: 'get',
    url: `${API_URL}/products/${productID}/styles`,
    headers: {
      Authorization: API_KEY
    }
  }).then(response => {
    setProductStyles(response.data);
    setProductPhoto(response.data.results[0].photos[0].thumbnail_url);
    return response.data.results[0].photos[0].thumbnail_url;
  }).catch(error => {
    console.log('error', error);
  });
}

// async function wearArticle(productID) {
//     let article = await findArticle(productID);
//     let photo = await findPhoto(productID);
//     // console.log(article, photo);
//     setOutfit([...outfit, {article: article, photo: photo}]);
// }

export default function handleAddItem(outfit) {
  return {
    type: OUTFIT,
    outfit
  };
}
