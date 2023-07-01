import React from "react";
import {useSelector} from "react-redux";
import ProductStyle from "./ProductStyle.jsx";
import {Stack} from "@mui/material";

export default function ProductStyles({styles, ...props}) {

  return (
    <Stack direction={'row'} sx={{flexWrap: 'wrap'}}>
      {styles.map((style) => (
        <ProductStyle key={style.style_id} style={style} {...props} />
      ))}
    </Stack>
  )
}