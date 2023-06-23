import React, {useEffect} from "react";

export default function ProductStyle({style}) {

  useEffect(() => {
    const image = new Image();
    image.src = style.photos[0].thumbnail_url;
  }, []);

  function createThumbnail() {
    return {
      height: '100px',
      width: '100px',
      backgroundImage: `url(${style.photos[0].thumbnail_url})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      borderRadius: '50%'
    };
  }
  return (
    <>
      <div className="style_thumbnail" style={createThumbnail()}></div>
      {/*<img src={style.photos[0].thumbnail_url} alt=""/>*/}
    </>
  )
}