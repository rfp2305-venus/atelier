import axios from 'axios';

const baseURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

export default function executeRequest(endpoint, method = 'get', headers = {}, params = {}, body = {}) {
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

export async function fetchProductRatings(productId) {
  const endpoint = '/reviews/meta?product_id=' + productId;

  try {
    return await executeRequest(endpoint, 'get');
  } catch (err) {
    console.error(err);
  }
};

export async function fetchProduct(productId) {
  const endpoint = '/products/' + productId;

  try {
    const product = await executeRequest(endpoint, 'get');
    const styles = await executeRequest(endpoint + '/styles');
    const rating = await fetchProductRatings(productId);
    return { ...product, styles: styles.results, rating };
  } catch (err) {
    console.error(err);
  }
}

export async function fetchProducts() {
  const endpoint = '/products?count=25';
  try {
    return executeRequest(endpoint, 'get')

  } catch(err) {

  }
}