import React, {useEffect} from "react";

export default function ProductStyle({style, onSelectStyle}) {
  function createThumbnail() {
    return {
      height: '75px',
      width: '75px',
      backgroundImage: `url(${style.photos[0].thumbnail_url})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      borderRadius: '50%'
    };
  }
  return (
    <>
      <div
        className="style_thumbnail"
        style={createThumbnail()}
        onClick={() => onSelectStyle(style.style_id)}
      />
      {/*<img src={style.photos[0].thumbnail_url} alt=""/>*/}
    </>
  )
}