import React, {useEffect} from 'react';

export default function ImgScroll({photos, selected, onSelect}) {

  useEffect(() => {

  }, [photos])

  return photos.map((x, i) => (
    <div
      key={x.url}
      className={
        i === selected
          ? 'img-item selected-img'
          : 'img-item'
      }
      onClick={() => onSelect(i)}
      style={{
        width: '75px',
        height: '75px',
        marginBottom: '8px',
        flexShrink: 0,
        backgroundImage: `url(${x.thumbnail_url})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '10px'
      }}
    />
  ))
}