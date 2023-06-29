import {useEffect, useState, useRef} from "react";

export default function Loading({status}){
  const [percent, setPercent] = useState(0);
  const lineWidth = 10;
  const canvasRef = useRef();
  const getLine = function(percent) {
    return {
      x: (window.innerWidth * percent) - 50,
      y: lineWidth / 2,
      x1: (window.innerWidth * percent) + 50,
      y1: lineWidth / 2
    }
  }

  const draw = function(ctx, line) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.beginPath();
    ctx.strokeStyle = '#969696';
    ctx.lineCap = 'round';
    ctx.moveTo(line.x, lineWidth / 2);
    ctx.lineWidth = 20;
    ctx.lineTo(line.x1, lineWidth / 2);
    ctx.fill();
    ctx.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = lineWidth;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    let stage = 1;
    let frameCount = 0;
    let animationFrameId;
    let interval;

    const render = () => {
      if(frameCount === 100) {
        stage = 2;
      } else if(frameCount <= 0) {
        stage = 1;
      }

      if(stage === 1) {
        frameCount++;
      } else {
        frameCount--;
      }

      draw(ctx, getLine(frameCount / 100));

      animationFrameId = window.requestAnimationFrame(render);
    }

    render();

    return () => {

      clearInterval(interval);
      window.cancelAnimationFrame(animationFrameId)
    }
  },[canvasRef]);

  return (
    <canvas
      data-testid='loading'
      ref={canvasRef}
      style={{position: 'absolute', top: 0, left: 0}}
      role="loading"
    ></canvas>
  );
}