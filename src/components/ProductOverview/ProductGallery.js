
import React, {useEffect} from "react";

function renderMobile() {
  return (
    <div className="img-row" style={{height: '35vh', maxWidth: '100%', display: 'flex', overflow: 'scroll'}}>
      {product.photos.map((photo) => (
        <img src={photo.url} alt="" style={{maxHeight: '50vh'}}/>
      ))}
    </div>
  );
}

export default function ProductGallery({product}) {

  return (
    <div className="img-row" style={{height: '35vh', maxWidth: '100%', display: 'flex', overflow: 'scroll'}}>
      {product.photos.map((photo) => (
        <img key={photo.url} src={photo.url} alt="" style={{maxHeight: '50vh'}}/>
      ))}
    </div>
  );
}