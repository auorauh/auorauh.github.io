import React, { useRef, useEffect } from 'react';

const TVStatic = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);

    const generateStatic = () => {
      for (let i = 0; i < buffer.length; i++) {
        const grayscale = Math.random() * 50 | 0;
        buffer[i] = (255 << 24) | (grayscale << 16) | (grayscale << 8) | grayscale;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    generateStatic();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStatic();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default TVStatic;
