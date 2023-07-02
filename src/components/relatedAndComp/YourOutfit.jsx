/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import react from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import OutfitCard from './OutfitCard';
import AddToOutfit from './AddToOutfit';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function YourOutfit() {

  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   console.log('state:', state);
  // }, []);


  return (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Box className="carousel" id="your-outfit" width='800px'>
        <AddToOutfit />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
      </Box>
    </>
  );
}
// const [ outfit, setOutfit ] = useState([]);
// const [ product, setProduct ] = useState({});
// const [ productStyles, setProductStyles ] = useState({});
// const [ productPhoto, setProductPhoto ] = useState('');

// //declare find article fn - pass into AddToOutfit prop
// // console.log('product', product);
// // console.log('productPhoto', productPhoto);
// console.log('outfit: ', outfit);
// function findArticle(productID) {
//   //axios call to get category, name, price, and star rating
//   return axios({
//     method: 'get',
//     url: `${API_URL}/products/${productID}`,
//     headers: {
//       Authorization: API_KEY
//     }
//   }).then(response => {
//     setProduct(response.data);
//     return response.data;
//   }).catch(error => {
//     console.log('error', error);
//   })
// }

// function findPhoto(productID) {
//   return axios({
//     method: 'get',
//     url: `${API_URL}/products/${productID}/styles`,
//     headers: {
//       Authorization: API_KEY
//     }
//   }).then(response => {
//     setProductStyles(response.data);
//     setProductPhoto(response.data.results[0].photos[0].thumbnail_url);
//     return response.data.results[0].photos[0].thumbnail_url;
//   }).catch(error => {
//     console.log('error', error);
//   });
// }

// async function wearArticle(productID) {
//     let article = await findArticle(productID);
//     let photo = await findPhoto(productID);
//     // console.log(article, photo);
//     setOutfit([...outfit, {article: article, photo: photo}]);
// }


// //declare remove from outfit fn - pass into each OutfitCard
// function removeArticle(productID) {

// }