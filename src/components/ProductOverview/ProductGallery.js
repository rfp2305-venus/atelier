
import React, {useEffect, useState} from "react";
import useResize from "../../lib/useResize";

function renderMobile(photos) {
  return (
    <div className="img-row" style={{height: '35vh', maxWidth: '100%', display: 'flex', overflow: 'scroll'}}>
      {photos.map((photo) => (
        <img key={photo.url} src={photo.url} alt="" style={{maxHeight: '50vh'}}/>
      ))}
    </div>
  );
}

function renderDesktop(photos, selectedImage, onSelectImage) {
  return (
    <div className="gallery-container">
      <div className="img-scroll">
        {photos.map((x, i) => (
          <img
            src={x.thumbnail_url} alt=""
            onClick={() => onSelectImage(i)}
            className={
              i === selectedImage
                ? 'img-item selected-img'
                : 'img-item'
            }
          />
        ))}
      </div>
      <div className="gallery-main">
        <img
          src={photos[selectedImage].url} alt=""
          className='main-img'
        />
      </div>
    </div>
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
    windowWidth < 668
      ? renderMobile(product.photos, props)
      : renderDesktop(product.photos, selectedImage, handleSelectImage)
  );
}