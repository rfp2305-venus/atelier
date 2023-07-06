import React from "react";
import {useSelector} from "react-redux";
import ProductStyle from "./ProductStyle.jsx";
import {Box, Stack, Typography} from "@mui/material";

export default function ProductStyles({styles, ...props}) {

  const stylesArray = [];
  let indx = 0;

  if(styles && styles.length) {
    while (indx < styles.length) {
      stylesArray.push(styles.slice(indx, indx + 4))
      indx += 4;
    }
  }
  return (
    <Box>
      <Typography>
        {props.selectedStyle.name}
      </Typography>
      <Stack
        direction={'column'}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }}
      >
        {
          stylesArray.map((styleArray, i) =>
            <Box>
              {styleArray.map((style) => (
                <ProductStyle
                  selected={props.selectedStyle.style_id === style.style_id}
                  key={style.style_id}
                  style={style}
                  {...props}
                />
              ))}
            </Box>
          )
        }
      </Stack>
    </Box>
  )
}