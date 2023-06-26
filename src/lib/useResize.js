import React, {useEffect, useState} from "react";

const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;


export default function useResize() {
 const [width, setWidth] = useState(getWidth());

 useEffect(() => {
   let interval = null;
   function resizeListener() {

     if(interval)
       window.clearInterval(interval);

     interval = window.setInterval(() => {
       setWidth(getWidth());
       clearInterval(interval);
     }, 150);
   }
   window.addEventListener('resize', resizeListener);

   return () => {
     window.removeEventListener('resize', resizeListener);
     clearInterval(interval);
   }

 }, []);

 return width;
}