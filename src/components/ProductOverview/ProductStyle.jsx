import React from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function ProductStyle({style, selected, onSelectStyle}) {
  return (
    <div
      className={`
          style_thumbnail
          ${selected && ' selected-style'}
        `}
      style={{
        backgroundImage: `url(${style.photos[0].thumbnail_url})`,
        position: 'relative'
      }}
      role="style-thumbnail"
      onClick={() => onSelectStyle(style.style_id)}
      data-testid={`style-thumbnail-${style.style_id}`}
    >
      {selected && (
        <CheckIcon
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            color: '#00ff84',
            fontSize: '18px',
            border: '1px solid rgb(0 255 132)',
            borderRadius: '50%',
          }}
        ></CheckIcon>
      )}
    </div>
  )
}