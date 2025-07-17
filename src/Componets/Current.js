import { useState, useRef, useEffect, useImperativeHandle,forwardRef  } from 'react';
import { Canvas, useFrame, useThree, useLoader} from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import staticbg from '../Assets/static.png';
import "./Current.css";
import { portContent } from './portContent.js';
import 'devicon/devicon.min.css';

function ExpandingGlobe({ isExpanded, onClick, onToggleExpand }, ref) {
  const [content, setContent] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [title, setTitle] = useState('');
  const [main, setMain] = useState('Select a card to begin');
  const [subSection, setSub] = useState('');
  const [gridHeaders, setHeaders] = useState('');
  const [gridContent, setGridContent] = useState([]);
  const globeRef = useRef();
  const { camera } = useThree();
  const targetScale = isExpanded ? 3 : 1;
  const targetCameraZ = isExpanded ? 0.5 : 10; // Changed to 0.5 to prevent click issues

    useEffect(() => {
          const checkMobile = () => {
          setIsMobile(window.matchMedia('(max-width: 600px)').matches);
        };

        // Initial check
        checkMobile();
        
        // Listen for changes
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [ref]);
  useFrame(() => {
    globeRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
    camera.position.lerp(
      new THREE.Vector3(0, 0, targetCameraZ),
      0.05
    );
    globeRef.current.rotation.y += 0.003;
  });
    useImperativeHandle(ref, () => ({
    fillContent: (selection) => {
      setContent(portContent[0]);
      setTitle(portContent[selection].title);
      setMain(portContent[selection].main);
      setSub(portContent[selection].subSection);
      setHeaders(portContent[selection].gridHeaders);
      setGridContent(portContent[selection].gridContent);
    }
  }));

  return (
    <group>
    <mesh 
      ref={globeRef} 
      onClick={onClick}
      scale={1}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial 
        color="#1AC90B" 
        wireframe 
        transparent 
        opacity={0.8} 
      />
    </mesh>
    <Html
          distanceFactor={.65} // Scale factor
          position={[0, 0, 0]} // Offset from mesh center
          transform // Respects mesh rotation/scale
          occlude // Hide when behind objects
        >
          <div className="box" style={{
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            width: isMobile ? '200px' : '600px',
          }}>
            <h3>{title}</h3>
                  <div className="main">
                    {main}
                </div>
                <div className="subSection">
                  {subSection}
                </div>
                <div className="grid">
                  <div className="headers">
                    <div className="gridHeader">{gridHeaders[0]}</div>
                    <div className="gridHeader">{gridHeaders[1]}</div>
                    <div className="gridHeader">{gridHeaders[2]}</div>
                  </div>
                <div className="gridContent">
                  {gridContent.map((row, rowIndex) => (
                    <div className="grid-row" key={`row-${rowIndex}`}>
                      {row.map((cell, colIndex) => (
                        <div 
                          className="grid-cell" 
                          key={`cell-${rowIndex}-${colIndex}`}>
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                </div>
                
            <button className="resetBtn" onClick={onToggleExpand}>Return</button>
          </div>
        </Html>
    </group>
  );
  
}
const ForwardedExpandingGlobe = forwardRef(ExpandingGlobe);
function LineworkGlobe() {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandingGlobeRef = useRef();
  const orbitControlsRef = useRef(); // New ref for OrbitControls

  // Disable controls when expanded
  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !isExpanded;
      if (isExpanded) {
        orbitControlsRef.current.reset();
      }
    }
  }, [isExpanded]);

  const handleCardClick = (selection) => {
    if (expandingGlobeRef.current?.fillContent) {
      expandingGlobeRef.current.fillContent(selection);
    }
    setIsExpanded(true);
  };

  const reset = () => {
    setIsExpanded(!isExpanded);
  }


  return (
    <div className="container">
      {isExpanded ? null : 
      <div className="overlay">
        <div className="nameCard"> Trenton Teasdale</div>
        <div className='card' onClick={() => handleCardClick(0)}>About Me</div>
        <div className='card' onClick={() => handleCardClick(1)}>Skills</div>
        <div className='card' onClick={() => handleCardClick(2)}>Projects</div>
        <div className='card bottom' onClick={() => handleCardClick(3)}>Contact</div>
      </div>
}
      <Canvas 
        camera={{ position: [0, 0, 10] }}
        style={{ 
          width: '100%', 
          height: '100vh',
          background: 'transparent',
          cursor: 'pointer'
        }}
        gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.5} />
        <ForwardedExpandingGlobe 
          ref={expandingGlobeRef}
          isExpanded={isExpanded}
          onToggleExpand={reset}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <OrbitControls 
          ref={orbitControlsRef}
          enableDamping 
          dampingFactor={0.05}
          minDistance={isExpanded ? 0.5 : 5}
          maxDistance={15}
          enableZoom={false} // Disable all zoom (scroll/pinch)
          enablePan={false} // Optional: disable panning
        />
      </Canvas>
    </div>
  );
}

export default LineworkGlobe;