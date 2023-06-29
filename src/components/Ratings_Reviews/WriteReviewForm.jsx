const { API_URL, API_KEY } = process.env;
import React, { useState } from 'react';
import StarRating from '../../lib/StarRating.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function WriteReviewForm() {
  //handleState
  //const [rating, setRating] = useState(0);

  const { product } = useSelector(({ productDetail }) => productDetail);
  const [characteristics, setCharacteristics] = useState({});
  const [rating, setRating] = useState('');
  const [recommend, setRecommend] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleRecommendChange = (e) => {
    e.target.value === 'true' ? setRecommend(true) : setRecommend(false);
  };

  const handleTextChange = (e) => {
    if (e.target.id === 'reviewSummary') {
      setSummary(e.target.value);
    } else if (e.target.id === 'reviewBody') {
      setBody(e.target.value);
    } else if (e.target.id === 'reviewName') {
      setName(e.target.value);
    } else if (e.target.id === 'reviewEmail') {
      setEmail(e.target.value);
    }
  };

  const handleSubmitReview = (e) => {
    axios.post(`${ API_URL }/reviews`, {
      headers: { Authorization: API_KEY },
      body: {
        product_id: product.id,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommend,
        name: name,
        email: email,
        photos: photos,
        characteristics: characteristics
      }
    }).then((res) => {


    });
  }

  return (
    <div id='reviewForm'>
      <div>Write Your Review</div>
      <div>About the Product Here!</div>
      <div >

        <div id='starRating '>
            How would you rate this product?

          {/* <StarRating /> */}

        </div>

        <form id='recommendItem'>
          <div className='recommendItem'>
            Do you recommend this product?
          </div>
          <input type='radio' name='recommend' value={true} onChange={handleRecommendChange}/>Yes
          <input type='radio' name='recommend' value={false} onChange={handleRecommendChange}/>No
        </form>

        <form id='reviewComments'>
          <label htmlFor='reviewSummary'>Review Summary</label>
          <textarea id='reviewSummary' onChange={handleTextChange} value={summary} maxLength='60' placeholder='Example: Best purchase ever!'></textarea>

          <label htmlFor='reviewBody'>Review Body</label>
          <textarea id='reviewBody' onChange={handleTextChange} value={body} maxLength='1000' placeholder='Why did you like the product or not?'></textarea>

          <label htmlFor='reviewName'>Nickname</label>
          <input type='text' id='reviewName' onChange={handleTextChange} value={name} maxLength='60' placeholder='Example: H.R.!'></input>

          <div id='nameWarning'>For privacy reasons, do not use your full name or email address.</div>

          <label htmlFor='reviewEmail'>Email Address</label>
          <input type='text' id='reviewEmail' onChange={handleTextChange} value={email} maxLength='60' placeholder='Example: hackreactor@gmail.com'></input>

          <div id='emailWarning'>For authentication reasons, you will not be emailed.</div>
        </form>
      </div>
      <button id='submitButton' onClick={handleSubmitReview}>
        {/* onClick={(e) => {
        handleSubmitReview({product_id: currentProductId, rating, characteristics, recommend, summary, body, name, email, photos});
        handleClose();
      }} */}
          Submit
      </button>
    </div>
  );
}




// const characteristicsArray = createCharacteristicsArray(productCharacteristics, 'id');

// const handleCharacteristicsChange = (e) => {
//   setCharacteristics({...characteristics, [e.target.name]: Number(e.target.value)});
// };

// const starRatingMeaning = (rating) => {
//   if (rating === 1) {
//     return 'Poor';
//   } else if (rating === 2) {
//     return 'Fair';
//   } else if (rating === 3) {
//     return 'Average';
//   } else if (rating === 4) {
//     return 'Good';
//   } else if (rating === 5) {
//     return 'Great';
//   }
// };

{ /* <div id='characteristics' '>
          {characteristicsArray.map((characteristic, i) => {
            return <CharacteristicsRadio key={`characteristicRadio${i}`} characteristic={characteristic} handleCharacteristicsChange={handleCharacteristicsChange} />;
          })}
        </div> */ }
