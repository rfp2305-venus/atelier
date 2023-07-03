
import React, {useEffect, useRef, useState} from "react";
import useResize from "../../lib/useResize";
import {Box, Container, Grid, IconButton, Paper} from "@mui/material";
import ImgScroll from "../../lib/ImgScroll";
import {Expand, Fullscreen} from "@mui/icons-material";

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

export default function ProductGallery({product, ...props}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const windowWidth = useResize();
  const mainImgRef = useRef(null);
  const glassImgRef = useRef(null);
  const [mouseIn, setMouseIn] = useState(false);
  const [mouse, setMouse] = useState({x: 0, y: 0, backgroundPosition: null});
  const [fullScreen, setFullScreen] = useState(false);

  function handleSelectImage(index) {
    setSelectedImage(index);
  }

  function handleMouseEnter() {
    setMouseIn(true);
  }

  function handleMouseLeave() {
    setMouseIn(false);
    setMouse(null);
  }

  function handleMouseMove(e) {
    e.preventDefault();
    const img = mainImgRef.current.getBoundingClientRect();
    const glass = glassImgRef.current;
    const zoom = 1.5;

    let w = glass.offsetWidth / 2;
    let h = glass.offsetHeight / 2;
    let x = (e.pageX - img.left);
    let y = (e.pageY - img.top);
    x = (x - window.pageXOffset);
    y = (y - window.pageYOffset);

    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}


    setMouse({
      top: y - h,
      left: x - w,
      backgroundImage: `url(${product.photos[selectedImage].url})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: (img.width * zoom) + "px " + (img.height * zoom) + "px",
      backgroundPosition:
        "-" + ((x * zoom) - w + 3) + "px " +
        "-" + ((y * zoom) - h + 3) + "px"
    });
    // console.log(w, h);
  }

  function toggleFullScreen() {
    setFullScreen(!fullScreen);
  }

  useEffect(() => {
    if(product.photos.length)
      setSelectedImage(0);
  }, [product]);

  // ADDED
  let aspectRatio;

  if (selectedImage) {
    // calculate aspect ratio of selected image
    aspectRatio = selectedImage.height / selectedImage.width;
  }

  return selectedImage !== null && (/*
    windowWidth <= 600
      ? renderMobile(product.photos, selectedImage, handleSelectImage)
      : */(
      <div
        className={
          fullScreen ? 'gallery-wrapper full-screen' : 'gallery-wrapper'
        }
        // ADDED
        style={{
          paddingBottom: `${ aspectRatio * 100 }%`, // i.e. ensures consistency of container dimensions (even if screen size changes)
          position: 'relative'
        }}
      >

        <ImgScroll
          photos={product.photos} selected={selectedImage}
          onSelect={handleSelectImage}
        />

        <Container
          style={{
            // ADDED
            position: 'absolute',
            top: 0,
            left: 0,
            // position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            maxWidth: '100vw'
          }}
          onMouseMove={mouseIn ? handleMouseMove : null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <IconButton
            onClick={toggleFullScreen}
            className='icon-top-right'
          >
            <Fullscreen />
          </IconButton>

          {/* use aspect ratio for selected image */}
          <img
            src={product.photos[selectedImage].url}
            ref={mainImgRef}
            alt=""
            className="gallery-main"

            // ADDED
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            // ensures image fits inside container while preserving aspect ratio

            // style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          {mouseIn && (
            <div
              ref={glassImgRef}
              style={{
                position: 'absolute',
                height: '300px',
                width: '300px',
                borderRadius: '50%',
                ...mouse
              }}
            />
          )}

        </Container>
          {/*<Box*/}
          {/*     sx={{*/}
          {/*       height: '100%',*/}
          {/*       position: 'relative',*/}
          {/*       flexGrow: 1*/}
          {/*       /*display: 'flex',*/}
          {/*       justifyContent: 'center',*/}
          {/*       alignItems: 'center',*/}
          {/*     }}*/}
          {/*>*/}

          {/*  */}

          {/*</Box>*/}

      </div>
    )

  );
}






{/*<div
              ref={mainImgRef}
              className="gallery-main"
              onMouseMove={mouseIn ? handleMouseMove : null}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                height: '50vw',
                backgroundImage: `url(${product.photos[selectedImage].url})`,
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                borderRadius: '2%',
                position: 'relative'
              }}>
              <div className="img-scroll" >
                <ImgScroll photos={product.photos} selected={selectedImage} onSelect={handleSelectImage}/>
              </div>
              {mouseIn &&
              <div
                ref={glassImgRef}
                style={{
                  position: 'absolute',
                  height: '300px',
                  width: '300px',
                  borderRadius: '50%',
                  ...mouse
                }}
              />
              }
            </div>*/}