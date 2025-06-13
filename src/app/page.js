'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import Project from './project';
import { floorListData } from './floorListData.js'
import styles from "./page.module.css";
import logo from "../../public/64.png";
import cloud from '../../public/Assets/cloud.png';
import Tower from '../../public/Assets/Tower.png';
import Base from "../../public/Base.png";
import Foundation from "../../public/Foundation.png";
import Fire from '../../public/Fire.png';

export default function Home() {
  const [portfolio, setPortfolio] = useState(false);
  const [showPort, setShow] = useState('flex');
  const [viewProject, setViewProject] = useState(false);
  const [twFloor, setTowerFloor] = useState(0);
  const [leftImgX, setlImgX] = useState('-101%');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverFloor, setHoverFloor] = useState(0);
  const [floorTitle, setTitle] = useState({title:null});
  const [explodeView, setExplodeView] = useState(false);
  let fldMap = floorListData.map(item => item.number);
  const fldRev = [...fldMap].reverse();
    const [projectData, setProjectData] = useState({
    title: '',
    description: ''
  });
  const baseTransforms = [
    '-348%','-319%','-290%','-261%','-232%','-203%','-174%','-145%','-116%','-87%', '-58%','-29%', '0%']; 
    // offset by -29% for new entry
  //     useEffect(() => {
  //   return () => {
  //   };
  // }, []);

  function selectFloor(index){
    if(index != undefined) {
          setTitle(floorListData[index-1]);
          let obj = projectData
          obj.title = floorListData[index-1].title;
          setProjectData(floorListData[index-1]);
    };
  }
  function towerFloor(index){
    console.log('cllick',index);
    setTowerFloor(index);
  }
function enterPortfolio() {
  const newPortfolio = !portfolio; 
  setPortfolio(newPortfolio);   
  setX(newPortfolio);
  setTitle({title:null});
}

function setX(toggle) {
  if (toggle) {
    setlImgX('0%'); 
  } else {
    setlImgX('-101%');
  }
}
function project(){
  setViewProject('none');
}

const toggleExplode = () => {
  setExplodeView(prev => !prev);
  setViewProject(prev => !prev);
};

  return (
    <div className={styles.page}>
      <div className={styles.header}>{portfolio ?  <div onClick={enterPortfolio}>LOST TOWER INC</div> : <div onClick={enterPortfolio}>SIXTY FOUR  FLOORS</div>} <Image className={styles.logo} src={logo} alt="site logo"></Image></div>
        <div className={styles.mainSection} onMouseLeave={() => setHoverIndex(null)}>
          {viewProject ? <Project info={projectData} close={toggleExplode}/> : <></>}
            <div className={styles.overlayContainer}>
              <div className={styles.cloudContainer}><Image className={styles.cloudImg} src={cloud} alt='background Cloud image'></Image> </div>
            {floorTitle.title != null ? <div className={styles.infoCard}>
              <div className={styles.FLtitle}>{floorTitle.title}</div>
              <i className={styles.releaseDate}>{floorTitle.release}</i>
              <div className={styles.FLlink} onClick={toggleExplode}>VIEW PROJECT</div>
            </div> : <></>}
            </div>
            <div className={styles.baseSection}>
            {baseTransforms.map((offset, index) => {
              let translateY = offset;
              let img = Base;
              let portImg = Tower;
              let showPortfolio = portfolio;
              let explodeOffset = 0;
              if (explodeView && hoverIndex !== null) {
                if (index < hoverIndex) {
                  explodeOffset = '-120vh'; // push blocks above offscreen
                } else if (index > hoverIndex) {
                  explodeOffset = '120vh'; // push blocks below offscreen
                }
              }

              
              if(index == baseTransforms.length-1){
                img = Foundation;
              }
              if(fldRev[index] == twFloor) {
                portImg = Fire;
              }
              let isHovered = false;
              if (hoverIndex !== null && index <= hoverIndex) {
                 isHovered = index === hoverIndex;
                 if(hoverIndex == index){
                 }
                const diff = hoverIndex - index;
                let lift = 30 - diff * 3;
                if(hoverIndex == baseTransforms.length-1){
                  lift = 0;
                  offset = 0;
                }
                if(viewProject == 'none') {
                  offset = 1000;
                }
                translateY = `calc(${offset} - ${lift}%)`;
                
            }
      return (
        <div className={styles.base} key={index}>
          <div className={styles.baseSelection}>
            <div className={styles.selection}
                 style={{
                    transform: `translateY(${translateY})`,
                    zIndex: baseTransforms.length - index + 1,
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={() => {setHoverIndex(index)}}
                  // onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => selectFloor(fldRev[index])}>
                <div className={`${styles.rotate} ${isHovered ? styles.fadeIn : styles.fadeOut}`}>
                  {isHovered && floorListData[index] !== undefined ? <>Floor {`${fldRev[index]}`}</> : <></>}
                </div>
            </div>
          </div>
            <Image
              key={index + 'port'}
              className={styles.portImg}
              src={portImg}
              alt={`PORTFOLIO IMG`}
              onClick={() => {towerFloor(fldRev[index])}}
              style={{
                zIndex: baseTransforms.length - index + 1,
                transform: `translateY(${translateY}) translateX(${leftImgX})`,
                transition: `transform 0.8s ease ${fldRev[index] * 175}ms` , 
                display: `${showPort}`,
              }}/>
            <Image
              key={index}
              className={styles.baseImg}
              src={img}
              alt={`Cuboid Block of a single floor of a building a link to Floor ${index}.`}
              style={{
                transform: `translateY(${explodeOffset || translateY})`,
                zIndex: baseTransforms.length - index,
                transition: 'transform 0.5s ease',
              }}/>
        </div>
      );
    })}
            </div>
        </div>
        <div className={styles.footer}>64 Floors Project</div>
    </div>
  );
}
