import React, {useEffect} from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function ProductStyle({style, selected, onSelectStyle}) {
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
          ${selected.style_id === style.style_id ? ' selected-style' : ''}
        `}
        style={{
          ...createThumbnail(),
          position: 'relative'
        }}
        onClick={() => onSelectStyle(style.style_id)}
        data-testid={`style-thumbnail-${style.style_id}`}
      >
        {selected && (
          <CheckIcon
            style={{
              position: 'absolute',
              right: '-4px',
              top: '-4px',
              color: 'green'
            }}
          ></CheckIcon>
        )}
      </div>
    </>
  )
}