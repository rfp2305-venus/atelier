import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {IconButton} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ImgScroll({photos, selected, onSelect}) {

  useEffect(() => {

  }, [photos])

  return (
    <div className="img-scroll">

      <IconButton
        className={'scroll-btn left'}
        disabled={selected === 0}
        onClick={() => onSelect(selected - 1)}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <IconButton
        className={'scroll-btn right'}
        disabled={selected + 1 >= photos.length}
        onClick={() => onSelect(selected + 1)}
      >
        <KeyboardArrowRightIcon />
      </IconButton>

      <Box
        className={'img-scroll-stack'}
        style={{

        }}

      >

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
            data-testid={`img-scroll-img`}
          />
        ))}
      </Box>

    </div>
  )
}