import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ImgScroll({photos, selected, onSelect}) {

  useEffect(() => {

  }, [photos])

  return (
    <div className="img-scroll">
      <Box className={'img-scroll-stack'} spacing={2}>
        {photos.map((x, i) => (
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
        ))}
      </Box>

    </div>
  )
}