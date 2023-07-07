
import React, {useEffect, useRef, useState} from "react";
import useResize from "../../lib/useResize";
import {Box, Container, Grid, IconButton, Paper} from "@mui/material";
import ImgScroll from "../../lib/ImgScroll";
import {Expand, Fullscreen} from "@mui/icons-material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function ProductGallery({product, ...props}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const windowWidth = useResize();
  const containerRef = useRef(null);
  const mainImgRef = useRef(null);
  const glassImgRef = useRef(null);
  const [navigationButtons, setNavigationButtons] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const [mouse, setMouse] = useState({x: 0, y: 0, backgroundPosition: null});
  const [fullScreen, setFullScreen] = useState(false);


  function handleSelectImage(index) {
    setSelectedImage(index);
  }

  function handleMouseEnter(x) {
    x.preventDefault();
    console.log(x);
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

    if (x > img.width - (w / zoom)) {
      x = img.width - (w / zoom);
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - (h / zoom)) {
      y = img.height - (h / zoom);
    }
    if (y < h / zoom) {
      y = h / zoom;
    }

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
  }

  function toggleFullScreen() {
    setFullScreen(!fullScreen);
  }

  useEffect(() => {
    if(product.photos.length)
      setSelectedImage(0);
  }, [product]);

  return selectedImage !== null && (
    <div
      className={
        fullScreen
          ? 'gallery-wrapper full-screen'
          : 'gallery-wrapper'
      }
      role="gallery-wrapper"
    >

      <ImgScroll
        photos={product.photos} selected={selectedImage}
        onSelect={handleSelectImage}
      />

      <Container
        ref={containerRef}
        className="gallery-main-container"
        onMouseMove={mouseIn ? handleMouseMove : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IconButton
          onClick={toggleFullScreen}
          className='icon-top-right'
          role="enter-fullscreen-btn"
        >
          <Fullscreen />
        </IconButton>

        <IconButton
          className="gallery-navigator-btn"
          role="select-last-btn"
          style={{left: 0}}
          onMouseEnter={() => setNavigationButtons(true)}
          onMouseLeave={() => setNavigationButtons(false)}
          disabled={selectedImage === 0}
          onClick={() => handleSelectImage(selectedImage - 1)}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <IconButton
          className="gallery-navigator-btn"
          role="select-next-btn"
          style={{right: 0}}
          onMouseEnter={() => setNavigationButtons(true)}
          onMouseLeave={() => setNavigationButtons(false)}
          disabled={selectedImage + 1 >= product.photos.length}
          onClick={() => handleSelectImage(selectedImage + 1)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <img
          src={product.photos[selectedImage].url}
          ref={mainImgRef}
          alt=""
          className="gallery-main"
          data-testid={`gallery-main-${selectedImage}`}
        />

        {mouseIn && (
          <div
            ref={glassImgRef}
            style={{
              position: 'absolute',
              height: '300px',
              width: '300px',
              borderRadius: '50%',
              visibility: navigationButtons ? 'hidden' : 'visible',
              ...mouse
            }}
          />
        )}

      </Container>
    </div>
  );
}
