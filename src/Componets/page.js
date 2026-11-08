import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Project from './project';
import About from './About';
import { floorListData } from '../floorListData.js'
import "./page.css";
import ig from "../Assets/ig.png";
import logo from "../Assets/64.png";
import cloud from '../Assets/cloud.png';
import Tower from '../Assets/Tower.png';
import Base from "../Assets/Base.png";
import Foundation from "../Assets/Foundation.png"
import Fire from '../Assets/Fire.png';

const FLOOR_COUNT = floorListData.length;
const FLOOR_NUMBERS = floorListData.map((item) => item.number);
const FLOOR_NUMBERS_REV = [...FLOOR_NUMBERS].reverse();
const STACK_COUNT = FLOOR_COUNT + 1; // floors + foundation

function readCssNumber(styles, name, fallback) {
  const raw = styles.getPropertyValue(name).trim().replace('%', '');
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

export default function Home() {
  const [portfolio, setPortfolio] = useState(false);
  const [showPort] = useState('flex');
  const [viewProject, setViewProject] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [twFloor, setTowerFloor] = useState(0);
  const [leftImgX, setlImgX] = useState('-101%');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [floorTitle, setTitle] = useState({ title: 'Select a floor to begin' });
  const [explodeView, setExplodeView] = useState(false);
  const [stackMetrics, setStackMetrics] = useState({
    overlap: 71,
    liftBase: 58,
    liftStep: 4,
  });
  const [projectData, setProjectData] = useState({
    title: '',
    description: ''
  });

  const baseSectionRef = useRef(null);
  const hoverIndexRef = useRef(null);
  const lastPointerYRef = useRef(null);
  const activeIndex = hoverIndex ?? selectedIndex;

  const syncStackMetrics = useCallback(() => {
    const el = baseSectionRef.current;
    if (!el) return;
    const styles = getComputedStyle(el);
    setStackMetrics({
      overlap: readCssNumber(styles, '--floor-overlap', 71),
      liftBase: readCssNumber(styles, '--floor-lift-base', 36),
      liftStep: readCssNumber(styles, '--floor-lift-step', 3.5),
    });
  }, []);

  const baseTransforms = Array.from(
    { length: STACK_COUNT },
    (_, i) => `${-i * stackMetrics.overlap}%`
  );

  useEffect(() => {
    syncStackMetrics();
    const el = baseSectionRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(() => {
      syncStackMetrics();
    });
    observer.observe(el);
    window.addEventListener('resize', syncStackMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncStackMetrics);
    };
  }, [syncStackMetrics]);

  // Map pointer Y → stack index from resting geometry (ignores lift transforms).
  // Measure from the first floor's layout top so top padding doesn't shift hits.
  const pickStackIndex = useCallback((clientY) => {
    const el = baseSectionRef.current;
    if (!el) return null;

    const firstFloor = el.querySelector('.base');
    if (!firstFloor) return null;

    const floorHeight = firstFloor.offsetHeight;
    if (!floorHeight) return null;

    const overlapRatio = stackMetrics.overlap / 100;
    const step = floorHeight * (1 - overlapRatio);
    if (step <= 0) return null;

    const rect = el.getBoundingClientRect();
    const yInContent = clientY - rect.top + el.scrollTop;
    const yFromTowerTop = yInContent - firstFloor.offsetTop;
    // Stay on the upper floor until deep into the next band (~75%).
    // Feels less jumpy when scrolling or dragging the pointer downward.
    const index = Math.floor((yFromTowerTop - step * 0.75) / step);

    if (index < 0 || index >= FLOOR_COUNT) return null;
    return index;
  }, [stackMetrics.overlap]);

  const showFloorPreview = useCallback((stackIndex) => {
    if (stackIndex === null || stackIndex === undefined) return;
    if (hoverIndexRef.current === stackIndex) return;

    hoverIndexRef.current = stackIndex;
    setHoverIndex(stackIndex);

    const floorNumber = FLOOR_NUMBERS_REV[stackIndex];
    const floor = floorListData[floorNumber - 1];
    if (floor) setTitle(floor);
  }, []);

  const selectFloorByIndex = useCallback((stackIndex) => {
    if (stackIndex === null || stackIndex === undefined) return;
    const floorNumber = FLOOR_NUMBERS_REV[stackIndex];
    if (floorNumber === undefined) return;
    const floor = floorListData[floorNumber - 1];
    if (!floor) return;

    hoverIndexRef.current = stackIndex;
    setTitle(floor);
    setProjectData(floor);
    setSelectedIndex(stackIndex);
    setHoverIndex(stackIndex);
  }, []);

  useEffect(() => {
    const baseEl = baseSectionRef.current;
    if (!baseEl) return undefined;

    // Floors overlap via translateY, so layout scrollHeight is much taller than
    // the visible tower. Cap scroll so the foundation sits at the bottom edge
    // (and the roof at the top when scrollTop is 0).
    const getVisualMaxScroll = () => {
      const first = baseEl.querySelector('.base');
      const floors = baseEl.querySelectorAll('.base');
      if (!first || floors.length === 0) return 0;

      const floorHeight = first.offsetHeight;
      const overlapRatio = stackMetrics.overlap / 100;
      const step = floorHeight * (1 - overlapRatio);
      // offsetTop already includes padding-top — keeps bottom stop + hover in sync.
      const visualBottom = first.offsetTop + (floors.length - 1) * step + floorHeight;
      return Math.max(0, visualBottom - baseEl.clientHeight);
    };

    const clampTowerScroll = () => {
      const maxScroll = getVisualMaxScroll();
      if (baseEl.scrollTop > maxScroll) {
        baseEl.scrollTop = maxScroll;
      }
      if (baseEl.scrollTop < 0) {
        baseEl.scrollTop = 0;
      }
    };

    const syncHoverFromPointer = () => {
      if (lastPointerYRef.current === null) return;
      const index = pickStackIndex(lastPointerYRef.current);
      if (index !== null) {
        showFloorPreview(index);
      }
    };

    const handleScroll = () => {
      clampTowerScroll();
      syncHoverFromPointer();
    };

    const isModalTarget = (target) =>
      Boolean(target.closest?.('.aboutPanel, .projectView, .aboutOverlay'));

    // Route wheel / trackpad scrolling anywhere on the page into the tower.
    const handleWheel = (event) => {
      if (isModalTarget(event.target)) return;

      event.preventDefault();
      baseEl.scrollTop += event.deltaY;
      clampTowerScroll();
      syncHoverFromPointer();
    };

    let touchStartY = null;
    const handleTouchStart = (event) => {
      if (isModalTarget(event.target) || event.touches.length !== 1) {
        touchStartY = null;
        return;
      }
      touchStartY = event.touches[0].clientY;
      lastPointerYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      if (touchStartY === null || event.touches.length !== 1) return;
      if (isModalTarget(event.target)) return;

      const currentY = event.touches[0].clientY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;
      lastPointerYRef.current = currentY;
      event.preventDefault();
      baseEl.scrollTop += delta;
      clampTowerScroll();
      syncHoverFromPointer();
    };

    const handleTouchEnd = () => {
      touchStartY = null;
    };

    baseEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    return () => {
      baseEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [stackMetrics, pickStackIndex, showFloorPreview]);

  const handleTowerPointerMove = (event) => {
    if (viewProject || viewAbout) return;
    lastPointerYRef.current = event.clientY;
    const index = pickStackIndex(event.clientY);
    if (index === null) return;
    showFloorPreview(index);
  };

  const handleTowerClick = (event) => {
    if (viewProject || viewAbout) return;
    // Ignore clicks that originated on the info card / links.
    if (event.target.closest('.infoCard, .FLlink, a, button')) return;
    const index = pickStackIndex(event.clientY);
    if (index === null) return;
    selectFloorByIndex(index);
  };

  function towerFloor(index) {
    setTowerFloor(index);
  }

  function enterPortfolio() {
    const newPortfolio = !portfolio;
    setPortfolio(newPortfolio);
    setX(newPortfolio);
    setTitle({ title: null });
  }

  function setX(toggle) {
    if (toggle) {
      setlImgX('0%');
    } else {
      setlImgX('-101%');
    }
  }

  const openAbout = () => {
    setViewAbout((prev) => !prev);
  }

  const toggleExplode = () => {
    setExplodeView((prev) => !prev);
    setViewProject((prev) => !prev);
  };

  const clearHover = () => {
    hoverIndexRef.current = null;
    setHoverIndex(null);
    if (selectedIndex !== null) {
      const floorNumber = FLOOR_NUMBERS_REV[selectedIndex];
      const floor = floorListData[floorNumber - 1];
      if (floor) setTitle(floor);
    } else {
      setTitle({ title: 'Select a floor to begin' });
    }
  };

  const getImageTranslate = (index, restingOffset) => {
    if (explodeView && activeIndex !== null) {
      if (index < activeIndex) return 'calc(-1 * var(--explode-distance))';
      if (index > activeIndex) return 'var(--explode-distance)';
    }

    // Same model as Floor 13 for every floor:
    // lift the selected floor (and everything above it). The roof label stays on
    // the resting slot, so it reads on the exposed roof below the floating block.
    if (activeIndex !== null && index <= activeIndex) {
      const diff = activeIndex - index;
      const lift = stackMetrics.liftBase - diff * stackMetrics.liftStep;
      return `calc(${restingOffset} - ${Math.max(lift, 0)}%)`;
    }

    return restingOffset;
  };

  return (
    <>
      <Helmet>
        <title>64 Floors – Creative Art Project</title>
        <link rel="icon" type="image/png" sizes="32x32" href="../Assets/64.png" />
        <meta
          name="description"
          content="64 Floors is an artistic journey through 64 unique creative spaces, each representing a different art style and mood."
        />
        <meta name="keywords" content="64 Floors, art project, creative series, Instagram art" />
        <meta property="og:title" content="64 Floors - Creative Art Project" />
        <meta property="og:description" content="Explore 64 unique floors of creativity." />
        <meta property="og:image" content="https://64floors.com/static/media/Base.37372380a2b4afafec1d.png" />
        <meta property="og:url" content="https://64floors.com" />
      </Helmet>
      <div className="page">
        <div className={"header"}>
          {portfolio ? (
            <div className="headerText" onClick={enterPortfolio}>LOST TOWER INC</div>
          ) : (
            <div className="headerText">SIXTY FOUR  FLOORS</div>
          )}
          <div className="rightHeader" onClick={openAbout}>
            <p className="aboutText">What is 64Floors?</p>
            <img className="icon" src={logo} alt="site logo" />
          </div>
        </div>
        <div className={"mainSection"}>
          {viewProject ? <Project info={projectData} close={toggleExplode} /> : null}
          {viewAbout ? <About close={openAbout} /> : null}
          <div className={"overlayContainer"}>
            <div className={"cloudContainer"}>
              <img className="cloudImg" src={cloud} alt="background Cloud img" />
            </div>
            {floorTitle.title !== null ? (
              <div className={"infoCard"}>
                <div className={"FLtitle"}>{floorTitle.title}</div>
                <i className={"releaseDate"}>{floorTitle.release}</i>
                {floorTitle.title === 'Select a floor to begin' ? null : (
                  <div className={"FLlink"} onClick={toggleExplode}>VIEW PROJECT</div>
                )}
              </div>
            ) : null}
          </div>
          <div
            className={"baseSection"}
            ref={baseSectionRef}
            onPointerMove={handleTowerPointerMove}
            onPointerLeave={clearHover}
            onClick={handleTowerClick}
          >
            {baseTransforms.map((restingOffset, index) => {
              let img = Base;
              let portImg = Tower;

              if (index === baseTransforms.length - 1) {
                img = Foundation;
              }
              if (FLOOR_NUMBERS_REV[index] === twFloor) {
                portImg = Fire;
              }

              const floorNumber = FLOOR_NUMBERS_REV[index];
              // Label lives on the floated floor's RESTING slot (image lifts away),
              // so it sits on the roof revealed below — same as Floor 13.
              const showRoofLabel = activeIndex !== null && index === activeIndex;
              const imageTranslate = getImageTranslate(index, restingOffset);

              return (
                <div className={"base"} key={index}>
                  <div className={"baseSelection"}>
                    {/*
                      Hit targets stay on the RESTING stack only.
                      Lift is applied to images, never to these bands,
                      so hover cannot slide onto the wrong floor.
                    */}
                    <div
                      className={"selection"}
                      style={{
                        transform: `translateY(${restingOffset})`,
                        zIndex: baseTransforms.length - index + 1,
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectFloorByIndex(index);
                        }
                      }}
                      role="button"
                      tabIndex={floorNumber ? 0 : -1}
                      aria-label={floorNumber ? `Select floor ${floorNumber}` : 'Building foundation'}
                    >
                      <div className={`rotate ${showRoofLabel ? "fadeIn" : "fadeOut"}`}>
                        {showRoofLabel && floorNumber ? <>Floor {`${floorNumber}`}</> : null}
                      </div>
                    </div>
                  </div>
                  <img
                    key={index + 'port'}
                    className={"portImg"}
                    src={portImg}
                    alt=""
                    aria-hidden="true"
                    onClick={() => { towerFloor(floorNumber); }}
                    style={{
                      zIndex: baseTransforms.length - index + 1,
                      transform: `translateY(${imageTranslate}) translateX(${leftImgX})`,
                      transition: `transform 0.8s ease ${(floorNumber || 0) * 175}ms`,
                      display: `${showPort}`,
                    }}
                  />
                  <img
                    key={index}
                    className={"baseImg"}
                    src={img}
                    alt=""
                    aria-hidden="true"
                    style={{
                      transform: `translateY(${imageTranslate})`,
                      zIndex: baseTransforms.length - index,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={"footer"}>
          <a className="igIcon" href="https://www.instagram.com/64floors/" target="_blank" rel="noopener noreferrer">
            <img className="igIcon" src={ig} alt="icon for linking instagram" />
          </a>
          <div>64 Floors Project</div>
        </div>
      </div>
    </>
  );
}
