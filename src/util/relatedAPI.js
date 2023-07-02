/* eslint-disable func-style */
function findArticle(productID) {
  //axios call to get category, name, price, and star rating
  return axios({
    method: 'get',
    url: `${API_URL}/products/${productID}`,
    headers: {
      Authorization: API_KEY
    }
  }).then(({ data }) => {
    return data;
  }).catch(error => {
    console.log('error', error);
  });
}

function findPhoto(productID) {
  console.log('findPhoto called');
  return axios({
    method: 'get',
    url: `${API_URL}/products/${productID}/styles`,
    headers: {
      Authorization: API_KEY
    }
  }).then(({ data }) => {
    return data.results[0].photos[0].thumbnail_url;
  }).catch(error => {
    console.log('error', error);
  });
}

export async function createArticle(productID) {

  try {
    console.log('createArticle called');
    const article = await findArticle(productID);
    const photo = await findPhoto(productID);
    // console.log(article, photo);
    // setOutfit([...outfit, {article: article, photo: photo}]);
    return { ...article };
  } catch (error) {
    console.log(error);
  }
}