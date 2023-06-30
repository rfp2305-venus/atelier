
import React, {useEffect, useRef, useState} from "react";
import useResize from "../../lib/useResize";
import {Box, Container, Grid, Paper} from "@mui/material";
import ImgScroll from "../../lib/ImgScroll";

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
  return
}

export default function ProductGallery({product, ...props}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mouseIn, setMouseIn] = useState(false);
  const [mouse, setMouse] = useState({x: 0, y: 0, backgroundPosition: null});
  const windowWidth = useResize();
  const mainImgRef = useRef(null);
  const glassImgRef = useRef(null);

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
    console.log(w, h);
  }

  useEffect(() => {
    if(product.photos.length)
      setSelectedImage(0);
  }, [product]);

  return selectedImage !== null && (/*
    windowWidth <= 600
      ? renderMobile(product.photos, selectedImage, handleSelectImage)
      : */(
        <Box sx={{minHeight: '550px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>

        <div className="img-scroll" style={{
          position: 'absolute',
          height: '525px',
          maxHeight: '525px',
          overflow: 'scroll',
          background: '#0e0e0ea1',
          padding: '8px',
          borderRadius: '10px',
          left: '-16px',
          zIndex: 1,
          // boxShadow: 'rgb(0 37 255 / 72%) 0px 1px 5px 0px'
        }}>
          <ImgScroll
            photos={product.photos} selected={selectedImage}
            onSelect={handleSelectImage}
          />
        </div>

        <div
          style={{position: 'relative'}}
          onMouseMove={mouseIn ? handleMouseMove : null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.photos[selectedImage].url}
            ref={mainImgRef}
            alt=""
            className="gallery-main"
            style={{
              // height: '500px',
              maxHeight: '75vh',
              maxWidth: '100%',
              borderRadius: '2%',
            }}
          />
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
        </div>


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
      </Box>
    )

  );
}