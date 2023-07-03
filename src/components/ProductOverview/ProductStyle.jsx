import React, {useEffect} from "react";

export default function ProductStyle({style, selectedStyle, onSelectStyle}) {
  function createThumbnail() {
    return {
      backgroundImage: `url(${style.photos[0].thumbnail_url})`,
    };
  }
  return (
    <>
      <div
        className={`
          style_thumbnail
          ${selectedStyle.style_id === style.style_id ? ' selected-style' : ''}
        `}
        style={createThumbnail()}
        onClick={() => onSelectStyle(style.style_id)}
        data-testid={`style-thumbnail-${style.style_id}`}
      />
    </>
  )
}