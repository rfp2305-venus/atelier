import React, {useEffect} from 'react';

export default function ImgScroll({photos, selected, onSelect}) {

  useEffect(() => {

  }, [photos])

  return photos.map((x, i) => (
    <div
      className={
        i === selected
          ? 'img-item selected-img'
          : 'img-item'
      }
      onClick={() => onSelect(i)}
      style={{
        width: '75px',
        height: '75px',
        backgroundImage: `url(${x.thumbnail_url})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '2%'
      }}
    />
  ))
}