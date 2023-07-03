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
              backgroundImage: `url(${x.thumbnail_url})`,
            }}
          />
        ))}
      </Box>

    </div>
  )
}