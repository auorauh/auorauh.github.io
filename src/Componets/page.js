import { useState } from 'react';
import Project from './project';
import { floorListData } from '../floorListData.js'
import "./page.css";
import logo from "../Assets/64.png";
import cloud from '../Assets/cloud.png';
import Tower from '../Assets/Tower.png';
import Base from "../Assets/Base.png";
import Foundation from "../Assets/Foundation.png"
import Fire from '../Assets/Fire.png';

export default function Home() {
  const [portfolio, setPortfolio] = useState(false);
  const [showPort, setShow] = useState('flex');
  const [viewProject, setViewProject] = useState(false);
  const [twFloor, setTowerFloor] = useState(0);
  const [leftImgX, setlImgX] = useState('-101%');
  const [hoverIndex, setHoverIndex] = useState(null);
  // const [hoverFloor, setHoverFloor] = useState(0);
  const [floorTitle, setTitle] = useState({title:null});
  const [explodeView, setExplodeView] = useState(false);
  let fldMap = floorListData.map(item => item.number);
  const fldRev = [...fldMap].reverse();
    const [projectData, setProjectData] = useState({
    title: 'hey',
    description: 'hey'
  });
  const baseTransforms = [
    '-348%','-319%','-290%','-261%','-232%','-203%','-174%','-145%','-116%','-87%', '-58%','-29%', '0%']; 
    // offset by -29% for new entry
  //     useEffect(() => {
  //   return () => {
  //   };
  // }, []);

  function selectFloor(index){
    if(index !== undefined) {
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
// function project(){
//   setViewProject('none');
// }

const toggleExplode = () => {
  setExplodeView(prev => !prev);
  setViewProject(prev => !prev);
};

  return (
    <div className="page">
      <div className={"header"}>{portfolio ?  <div className="headerText" onClick={enterPortfolio}>LOST TOWER INC</div> : <div className="headerText" onClick={enterPortfolio}>SIXTY FOUR  FLOORS</div>} <img className="icon" src={logo} alt="site logo"></img></div>
        <div className={"mainSection"} onMouseLeave={() => setHoverIndex(null)}>
          {viewProject ? <Project info={projectData} close={toggleExplode}/> : <></>}
            <div className={"overlayContainer"}>
              <div className={"cloudContainer"}><img className="cloudImg" src={cloud} alt='background Cloud img'></img> </div>
            {floorTitle.title !== null ? <div className={"infoCard"}>
              <div className={"FLtitle"}>{floorTitle.title}</div>
              <i className={"releaseDate"}>{floorTitle.release}</i>
              <div className={"FLlink"} onClick={toggleExplode}>VIEW PROJECT</div>
            </div> : <></>}
            </div>
            <div className={"baseSection"}>
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

              
              if(index === baseTransforms.length-1){
                img = Foundation;
              }
              if(fldRev[index] === twFloor) {
                portImg = Fire;
              }
              let isHovered = false;
              if (hoverIndex !== null && index <= hoverIndex) {
                 isHovered = index === hoverIndex;
                 if(hoverIndex === index){
                 }
                const diff = hoverIndex - index;
                let lift = 30 - diff * 3;
                if(hoverIndex === baseTransforms.length-1){
                  lift = 0;
                  offset = 0;
                }
                if(viewProject === 'none') {
                  offset = 1000;
                }
                translateY = `calc(${offset} - ${lift}%)`;
                
            }
      return (
        <div className={"base"} key={index}>
          <div className={"baseSelection"}>
            <div className={"selection"}
                 style={{
                    transform: `translateY(${translateY})`,
                    zIndex: baseTransforms.length - index + 1,
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={() => {setHoverIndex(index)}}
                  // onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => selectFloor(fldRev[index])}>
                <div className={`${"rotate"} ${isHovered ? "fadeIn" : "fadeOut"}`}>
                  {isHovered && floorListData[index] !== undefined ? <>Floor {`${fldRev[index]}`}</> : <></>}
                </div>
            </div>
          </div>
            <img
              key={index + 'port'}
              className={"portImg"}
              src={portImg}
              alt={`PORTFOLIO IMG`}
              onClick={() => {towerFloor(fldRev[index])}}
              style={{
                zIndex: baseTransforms.length - index + 1,
                transform: `translateY(${translateY}) translateX(${leftImgX})`,
                transition: `transform 0.8s ease ${fldRev[index] * 175}ms` , 
                display: `${showPort}`,
              }}/>
            <img
              key={index}
              className={"baseImg"}
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
        <div className={"footer"}>64 Floors Project</div>
    </div>
  );
}
