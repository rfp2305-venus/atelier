import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button, Stack} from "@mui/material";

function calculateAverage(ratings) {
  const sum =
    Number(ratings[1]) +
    Number(ratings[2]) +
    Number(ratings[3]) +
    Number(ratings[4]) +
    Number(ratings[5]);
  const average = (
      Number(ratings[1]) +
      (Number(ratings[2]) * 2) +
      (Number(ratings[3]) * 3) +
      (Number(ratings[4]) * 4) +
      (Number(ratings[5]) * 5)
    ) / sum;
  return average;
}

export default function StarRating() {
  const [stars, setStars] = useState(null);
  const {rating} = useSelector(({productDetail}) => productDetail.product);

  useEffect(() => {
    if (!rating) {
      return;
    }
    const average = calculateAverage(rating.ratings);
    let done = false;
    let tmpStars = [];
    for(let i = 1; i < 6; i++ ) {
      if(i <= Math.floor(average)) {
        tmpStars.push(100);
      } else if(!done) {
        tmpStars.push(Math.floor((average - Math.floor(average)) * 100))
        done = true;
      } else {
        tmpStars.push(0);
      }
    }

    setStars(tmpStars);
  }, [rating.ratings]);

  return (
    <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}} data-testid="star-rating">
      <div style={{height: '15px'}}>
        {stars && stars.map((star, indx) => renderStar(star, indx))}
      </div>
      <Button variant='text' sx={{color: 'black'}} onClick={() => document.getElementById('ratingsReviews').scrollIntoView()}>
        Read {
          Number(rating.ratings[1]) +
          Number(rating.ratings[2]) +
          Number(rating.ratings[3]) +
          Number(rating.ratings[4]) +
          Number(rating.ratings[5])
        } Ratings
      </Button>
    </Stack>
  );
}

function renderStar(fillPercent, id) {
  return (
    <svg
      key={id}
      style={{height: '100%'}}
      viewBox="0 0 576 512"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad${id}`}>
          <stop
            offset="0%"
            stopColor="#ffe700"
            id="stop747" />
          <stop
            offset={`${fillPercent}%`}
            stopColor="#ffe700"
            id="stop749" />
          <stop
            offset={`${fillPercent}%`}
            stopColor="transparent"
            id="stop751"
            style={{stopColor:'#010101', stopOpacity:0}} />
          <stop
            offset="1"
            stopColor="transparent"
            id="stop753"
            style={{stopColor:'#000000',stopOpacity:0}} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#grad${id})`}
        d="M 319.36799,21.257863 C 313.66504,10.395302 301.61351,3.4827634 288.37836,3.4827634 c -13.23516,0 -25.1791,6.9125386 -30.98965,17.7750996 L 188.20004,151.90485 33.68225,172.83998 c -12.912349,1.7775 -23.672641,10.07255 -27.6539492,21.42886 -3.981307,11.35631 -0.7532202,23.89763 8.5006292,32.29143 L 126.65117,328.3721 100.18086,472.25166 c -2.152064,11.85007 3.22808,23.89763 13.88077,30.90891 10.65268,7.01131 24.74866,7.90004 36.36977,2.27127 l 138.05456,-67.64413 138.05453,67.64413 c 11.62112,5.62877 25.7171,4.83879 36.36979,-2.27127 10.6527,-7.11003 16.03284,-19.05884 13.88077,-30.90891 L 450.21313,328.3721 562.33538,226.56027 c 9.25385,-8.3938 12.58955,-20.93512 8.50063,-32.29143 -4.08891,-11.35631 -14.74161,-19.65136 -27.65396,-21.42886 L 388.55666,151.90485 Z"
        style={{display:'inline',fill:`url(#grad${id})`, stroke:'#000000', strokeWidth:5.1541,strokeDasharray:'none',strokeOpacity:1}}
      />
    </svg>
  )
}