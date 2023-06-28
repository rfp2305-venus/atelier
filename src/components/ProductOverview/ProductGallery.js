
import React, {useEffect, useState} from "react";
import useResize from "../../lib/useResize";
import {Container, Grid} from "@mui/material";

function renderMobile(photos, selectedImage, onSelectImage) {
  const styles = {
    height: '35vh',
    width: '100%',
    backgroundImage: `url(${photos[selectedImage].url})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    borderRadius: '2%'
  };
  return (
    <Grid container spacing={0} >
      <Grid item xs={12}>
        <div className="img-row" style={styles}></div>
      </Grid>
      <Grid item xs={12} style={{display: 'flex'}}>
        {photos.map((x, i) => (
          <div
            className={
              i === selectedImage
                ? 'img-item selected-img'
                : 'img-item'
            }
            onClick={() => onSelectImage(i)}
            style={{
              height: '50px',
              width: '50px',
              backgroundImage: `url(${x.thumbnail_url})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              borderRadius: '2%'
            }}
          ></div>
        ))}
      </Grid>
    </Grid>
    /*<div className="img-row" style={{height: '35vh', maxWidth: '100%', display: 'flex', overflow: 'scroll'}}>
      {photos.map((photo, i) => (
        <img key={i + photo.url} src={photo.url} alt="" style={{maxHeight: '50vh'}}/>
      ))}
    </div>*/
  );
}

function renderDesktop(photos, selectedImage, onSelectImage) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3} sm={2} >
        <div className="img-scroll">
          {photos.map((x, i) => (

            <div
              className={
                i === selectedImage
                  ? 'img-item selected-img'
                  : 'img-item'
              }
              onClick={() => onSelectImage(i)}
              style={{
                height: '75px',
                backgroundImage: `url(${x.thumbnail_url})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                borderRadius: '2%'
              }}
            ></div>
          ))}
        </div>
      </Grid>
      <Grid item xs={9} sm={10} >
        <div className="gallery-main" style={{
          height: '50vw',
          maxHeight: '400px',
          backgroundImage: `url(${photos[selectedImage].url})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          borderRadius: '2%',
        }}></div>
      </Grid>
    </Grid>
  )
}

export default function ProductGallery({product, ...props}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const windowWidth = useResize();

  function handleSelectImage(index) {
    setSelectedImage(index);
  }

  useEffect(() => {
    if(product.photos.length)
      setSelectedImage(0);
  }, [product]);

  return selectedImage !== null && (
    windowWidth < 600
      ? renderMobile(product.photos, selectedImage, handleSelectImage)
      : renderDesktop(product.photos, selectedImage, handleSelectImage)
  );
}