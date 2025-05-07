import React, { useState, useEffect } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

import { floorListData } from '../floorListData';

function Landing() {
  const images = [floorListData[0].imagePath, floorListData[1].imagePath, floorListData[2].imagePath, floorListData[3].imagePath, floorListData[4].imagePath, floorListData[5].imagePath,floorListData[6].imagePath,floorListData[7].imagePath];
  const initialRadii = [
    { topLeft: 30, topRight: 30, bottomLeft: 30, bottomRight: 30 },
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

  useEffect(() => {
    const frequencies = [1.1, 1, 0.7, 0.8, 0.9];
    const startTime = Date.now();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
  
      setBorderRadii(prevRadii => prevRadii.map((_, index) => ({
        topLeft: 10 + 4 * Math.sin(frequencies[index] * elapsedTime + 0),
        topRight: 10 + 4 * Math.sin(frequencies[index] * elapsedTime + 1),
        bottomLeft: 10 + 4 * Math.sin(frequencies[index] * elapsedTime + 2),
        bottomRight: 10 + 4 * Math.sin(frequencies[index] * elapsedTime + 3),
      })));
  
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
              borderTopLeftRadius: `${borderRadii[0].topLeft}%`,
              borderTopRightRadius: `${borderRadii[0].topRight}%`,
              borderBottomLeftRadius: `${borderRadii[0].bottomLeft}%`,
              borderBottomRightRadius: `${borderRadii[0].bottomRight}%`,
            }}>
              <div className="logo"></div>
          </div>
          <div
            className="boxTwo"
            style={{
              // borderTopLeftRadius: `${borderRadii[1].topLeft}%`,
              // borderTopRightRadius: `${borderRadii[1].topRight}%`,
              // borderBottomLeftRadius: `${borderRadii[1].bottomLeft}%`,
              // borderBottomRightRadius: `${borderRadii[1].bottomRight -5}%`,
            }}
          >
          </div>
          <div
            className="boxThree"
            style={{
              borderTopLeftRadius: `${borderRadii[2].topLeft}%`,
              borderTopRightRadius: `${borderRadii[2].topRight}%`,
              borderBottomLeftRadius: `${borderRadii[2].bottomLeft}%`,
              borderBottomRightRadius: `${borderRadii[2].bottomRight}%`,
            }}
          >
          </div>
        </div>
        <div className="rowTwo">
        <Link
      to="https://www.instagram.com/64floors/"
      className="boxFour"
      style={{
        //backgroundImage: `url(${images[slideshowPhoto]})`,
        borderTopLeftRadius: `${borderRadii[3].topLeft}%`,
        borderTopRightRadius: `${borderRadii[3].topRight}%`,
        borderBottomLeftRadius: `${borderRadii[3].bottomLeft}%`,
        borderBottomRightRadius: `${borderRadii[3].bottomRight}%`,
      }}
    >
      <div className="fourText">All Floors</div>
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
              borderTopLeftRadius: `${borderRadii[4].topLeft}%`,
              borderTopRightRadius: `${borderRadii[4].topRight}%`,
              borderBottomLeftRadius: `${borderRadii[4].bottomLeft}%`,
              borderBottomRightRadius: `${borderRadii[4].bottomRight}%`,
            }}>
            <div className='fiveText'>Current Floor</div>
            <div className='fiveBg'></div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
