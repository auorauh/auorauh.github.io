import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Current.css';
import { portContent } from './portContent.js';
import 'devicon/devicon.min.css';

function ExpandingGlobe({ isExpanded }) {
  const globeRef = useRef();
  const { camera, size } = useThree();
  const isMobile = size.width <= 600;
  const targetScale = isExpanded ? (isMobile ? 1.4 : 1.65) : isMobile ? 1.35 : 1;
  const targetCameraZ = isExpanded ? (isMobile ? 6 : 7) : isMobile ? 6.5 : 10;

  useFrame(() => {
    if (!globeRef.current) return;
    globeRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
    camera.position.lerp(new THREE.Vector3(0, 0, targetCameraZ), 0.05);
    globeRef.current.rotation.y += 0.0012;
  });

  return (
    <mesh ref={globeRef} scale={1}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial
        color="#1AC90B"
        wireframe
        transparent
        opacity={isExpanded ? 0.35 : 0.8}
      />
    </mesh>
  );
}

function PortfolioPanel({ content, onClose }) {
  if (!content) return null;

  const sections = content.sections || [];
  const projects = content.projects || [];

  return (
    <div
      className={`portPanel portPanel--${content.layout || 'default'}`}
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
    >
      <div className="portPanelHeader">
        <h3 className="portPanelTitle">{content.title}</h3>
        <button type="button" className="resetBtn" onClick={onClose}>
          Return
        </button>
      </div>

      <div className="portPanelBody">
        {content.main ? <div className="main">{content.main}</div> : null}
        {content.subSection ? (
          <div className="subSection">{content.subSection}</div>
        ) : null}

        {sections.length > 0 ? (
          <div className="portSections">
            {sections.map((section) => (
              <div className="portSection" key={section.heading}>
                <h4 className="portSectionTitle">{section.heading}</h4>
                <ul className="portSectionList">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div className="projectGrid">
            {projects.map((project) => (
              <a
                className="projectCard"
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="projectCardText">
                  <span className="projectCardName">{project.name}</span>
                  {project.note ? (
                    <span className="projectCardNote">{project.note}</span>
                  ) : null}
                </span>
                <span className="projectCardArrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LineworkGlobe() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const orbitControlsRef = useRef();
  const containerRef = useRef(null);

  // Brave/iOS chrome: size to the *visual* viewport so Return + content
  // aren't hidden under the URL bar / browser footer.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const syncVisualViewport = () => {
      const vv = window.visualViewport;
      const height = Math.round(vv ? vv.height : window.innerHeight);
      const offsetTop = Math.round(vv ? vv.offsetTop : 0);
      const heightPx = `${height}px`;
      const topPx = `${offsetTop}px`;
      // Set on both so position:fixed descendants always resolve the vars
      root.style.setProperty('--vv-height', heightPx);
      root.style.setProperty('--vv-top', topPx);
      document.documentElement.style.setProperty('--vv-height', heightPx);
      document.documentElement.style.setProperty('--vv-top', topPx);
    };

    syncVisualViewport();
    window.addEventListener('resize', syncVisualViewport);
    window.visualViewport?.addEventListener('resize', syncVisualViewport);
    window.visualViewport?.addEventListener('scroll', syncVisualViewport);

    return () => {
      window.removeEventListener('resize', syncVisualViewport);
      window.visualViewport?.removeEventListener('resize', syncVisualViewport);
      window.visualViewport?.removeEventListener('scroll', syncVisualViewport);
      document.documentElement.style.removeProperty('--vv-height');
      document.documentElement.style.removeProperty('--vv-top');
    };
  }, []);

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !isExpanded;
      if (isExpanded) {
        orbitControlsRef.current.reset();
      }
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
        setActiveContent(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  const handleCardClick = (selection) => {
    setActiveContent(portContent[selection]);
    setIsExpanded(true);
  };

  const closePanel = () => {
    setIsExpanded(false);
    setActiveContent(null);
  };

  const initialCameraZ =
    typeof window !== 'undefined' && window.innerWidth <= 600 ? 6.5 : 10;

  return (
    <div className="container" ref={containerRef}>
      {!isExpanded ? (
        <div className="overlay">
          <div className="nameCard">
            <span>Trenton</span>
            <span>Teasdale</span>
          </div>
          <div className="card" onClick={() => handleCardClick(0)}>
            About Me
          </div>
          <div className="card" onClick={() => handleCardClick(1)}>
            Skills
          </div>
          <div className="card" onClick={() => handleCardClick(2)}>
            Projects
          </div>
          <div className="card bottom" onClick={() => handleCardClick(3)}>
            Contact
          </div>
        </div>
      ) : null}

      {isExpanded ? (
        <PortfolioPanel content={activeContent} onClose={closePanel} />
      ) : null}

      <div className={`canvas-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <Canvas
          camera={{
            position: [0, 0, initialCameraZ],
          }}
          gl={{ alpha: true }}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            cursor: isExpanded ? 'default' : 'pointer',
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.5} />

          <ExpandingGlobe isExpanded={isExpanded} />

          <OrbitControls
            ref={orbitControlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={4}
            maxDistance={15}
            enableZoom={false}
            enablePan={false}
            enabled={!isExpanded}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default LineworkGlobe;
