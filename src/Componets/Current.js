import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Current.css';
import logo from "../Assets/64.png";
import { floorListData } from '../floorListData';

function Current() {
  const location = useLocation(); 
  const [floorIndex, setFloorIndex] = useState(floorListData.length - 1); 

  const currentFloor = floorListData[floorIndex];
  const previousFloor = floorIndex > 0 ? floorListData[floorIndex - 1] : null;

  useEffect(() => {
      setFloorIndex(floorListData.length - 1); 
  }, [location.pathname]); 

  function changeFloor(change) {
    setFloorIndex(prevIndex => {
      let newIndex = prevIndex + change;

      if (newIndex < 0) newIndex = 0; 
      if (newIndex >= floorListData.length) newIndex = floorListData.length - 1; 

      return newIndex;
    });
  }

  return (
    <div className="container">
        <Link to="/">
          <img className="logo64" src={logo} alt="Logo" />
        </Link>
        
      <h2 className='title'>{currentFloor.title}</h2>
      <div className="buttons">
        <div>
          <button onClick={() => changeFloor(-1)}>Previous</button>
          <button onClick={() => changeFloor(1)}>Next</button>
        </div>
      </div>
      <div className="structure">
        <img className="image" src={currentFloor.imagePath} alt={currentFloor.title} />
        {previousFloor && (
          <div className="previous-floor">
            <img className="image" src={previousFloor.imagePath} alt={previousFloor.title} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Current;
