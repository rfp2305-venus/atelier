import React from "react";
import {useSelector} from "react-redux";

export default function StarRating() {
  const {rating} = useSelector(({productDetail}) => productDetail.product);

  return (
    <div>
      <span>★★★★☆</span> <span>Read All Ratings</span>
    </div>
  );
}