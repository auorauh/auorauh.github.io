import React, { useState, useEffect } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

import { floorListData } from '../floorListData';

function Landing() {
  const images = [floorListData[0].imagePath, floorListData[1].imagePath, floorListData[2].imagePath, floorListData[3].imagePath, floorListData[4].imagePath, floorListData[5].imagePath,floorListData[6].imagePath,floorListData[7].imagePath];
  const initialRadii = [
    { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 },
    { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 },
    { topLeft: 30, topRight: 30, bottomLeft: 30, bottomRight: 30 },
    { topLeft: 30, topRight: 30, bottomLeft: 30, bottomRight: 30 },
    { topLeft: 30, topRight: 30, bottomLeft: 30, bottomRight: 30 }
  ];

  
  const [borderRadii, setBorderRadii] = useState(initialRadii);
  const [slideshowPhoto, setSlideshowPhoto] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowPhoto(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // adjust breakpoint as needed

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};


  useEffect(() => {
    const frequencies = [1, 2, 1.5, .75, 1.8]; // slower, smoother wave
    const startTime = Date.now();
    let animationFrameId;
  
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
  
      setBorderRadii(prevRadii =>
        prevRadii.map((_, index) => {
          const wave = (offset) =>
            (useIsMobile ? 35 : 85) + 15 * Math.sin(frequencies[index] * elapsedTime + offset); // range 20–150
  
          return {
            topLeft: wave(0),
            topRight: wave(1),
            bottomLeft: wave(2),
            bottomRight: wave(3),
          };
        })
      );
  
      animationFrameId = requestAnimationFrame(animate);
    };
  
    animate();
  
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  

  return (
    <>
      <div className="box-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row">
          <div
            className="boxOne"
            style={{
              borderTopLeftRadius: `${borderRadii[0].topLeft}px`,
              borderTopRightRadius: `${borderRadii[0].topRight}px`,
              borderBottomLeftRadius: `${borderRadii[0].bottomLeft}px`,
              borderBottomRightRadius: `${borderRadii[0].bottomRight}px`,
            }}>
              <div className="logo"></div>
          </div>
          <div
            className="boxTwo"
            style={{
              borderTopLeftRadius: `${borderRadii[1].topLeft}px`,
              borderTopRightRadius: `${borderRadii[1].topRight}px`,
              borderBottomLeftRadius: `${borderRadii[1].bottomLeft}px`,
              borderBottomRightRadius: `${borderRadii[1].bottomRight}px`,
            }}
          >
          </div>
          <div
            className="boxThree"
            style={{
              borderTopLeftRadius: `${borderRadii[2].topLeft}px`,
              borderTopRightRadius: `${borderRadii[2].topRight}px`,
              borderBottomLeftRadius: `${borderRadii[2].bottomLeft}px`,
              borderBottomRightRadius: `${borderRadii[2].bottomRight}px`,
            }}
          >
          </div>
        </div>
        <div className="rowTwo">
        <Link
      to="https://www.instagram.com/64floors/"
      className="boxFour"
      style={{
        borderTopLeftRadius: `${borderRadii[3].topLeft}px`,
        borderTopRightRadius: `${borderRadii[3].topRight}px`,
        borderBottomLeftRadius: `${borderRadii[3].bottomLeft}px`,
        borderBottomRightRadius: `${borderRadii[3].bottomRight}px`,
      }}
    >
      <div className="fourText">All Floors</div>
      <div className="fourCard">
        <div className="cardWindow" style={{
        borderTopLeftRadius: `${borderRadii[3].topLeft}px`,
        borderTopRightRadius: `${borderRadii[3].topRight}px`,
        borderBottomLeftRadius: `${borderRadii[3].bottomLeft}px`,
        borderBottomRightRadius: `${borderRadii[3].bottomRight}px`,
      }}>
          </div>
          <div className="cardDesc"></div> </div>
      <div
        className="fourBg"
        style={{
          backgroundImage: `url(${images[slideshowPhoto]})`,
        }}
      />
    </Link>
          <Link
          to="/current"
            className="boxFive"
            style={{
              borderTopLeftRadius: `${borderRadii[4].topLeft}px`,
              borderTopRightRadius: `${borderRadii[4].topRight}px`,
              borderBottomLeftRadius: `${borderRadii[4].bottomLeft}px`,
              borderBottomRightRadius: `${borderRadii[4].bottomRight}px`,
            }}>
            <div className='fiveText'>Current Floor</div>
            <div className="fiveCard">
        <div className="cardWindow" style={{
        //backgroundImage: `url(${images[slideshowPhoto]})`,
        borderTopLeftRadius: `${borderRadii[4].topLeft}px`,
        borderTopRightRadius: `${borderRadii[4].topRight}px`,
        borderBottomLeftRadius: `${borderRadii[4].bottomLeft}px`,
        borderBottomRightRadius: `${borderRadii[4].bottomRight}px`,
      }}>
          </div>
          <div className="cardDesc"></div> </div>
            <div className='fiveBg'></div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
