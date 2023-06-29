/*credit for creative genius goes to Shay Lynes, I refactored his work*/
import axios from 'axios';

const baseURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

export default function relExecuteRequest(endpoint, method = 'get', headers = {}, params = {}, body = {}) {
  const url = baseURL + endpoint;
  headers = {
    Authorization: apiKey,
    ...headers
  };

  return axios({
    url,
    method,
    headers,
    params,
    body
  }).then(({ data }) => data)
    .catch(err => {
      throw Error(err);
    });
}

export async function relFetchProductRatings(productId) {
  const endpoint = '/reviews/meta?product_id=' + productId;

  try {
    return await relExecuteRequest(endpoint, 'get');
  } catch (err) {
    console.error(err);
  }
};

export async function relFetchProduct(productId) {
  const endpoint = '/products/' + productId;

  try {
    const product = await relExecuteRequest(endpoint, 'get');
    const styles = await relExecuteRequest(endpoint + '/styles');
    const rating = await relFetchProductRatings(productId);
    return { ...product, styles: styles.results, rating };
  } catch (err) {
    console.error(err);
  }
}
