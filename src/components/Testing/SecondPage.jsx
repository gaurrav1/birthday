// components/SecondPage.jsx
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {ConfettiEffect} from './ConfettiEffect';

function Model() {
  // Load from public directory
  const { scene } = useGLTF('/models/Barrel.gltf');
  return <primitive object={scene} scale={0.5} />;
}

function Scene() {
  const glassRef = useRef();

  // Add error boundary
  try {
    return (
      <group>
        <Model />
        <mesh ref={glassRef} position={[0, 0, -20]}>
          <boxGeometry args={[2, 4, 0.1]} />
          <meshStandardMaterial color="#ffffff" transparent />
        </mesh>
      </group>
    );
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
}

export const SecondPage = () => {
    const confettiRef = useRef(() => {});

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.to('.birthday-text', { opacity: 1, duration: 1, delay: 5 })
          .to('.next-button', { opacity: 1, duration: 1 })
          .eventCallback('onStart', () => {
            if (typeof confettiRef.current === 'function') {
              confettiRef.current();
            }
          });
      });

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <PresentationControls>
            <Stage environment="city">
              <Scene />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>

      <div className="birthday-text">Happy 21st Birthday!</div>
      <button className="next-button">Next</button>
      <ConfettiEffect ref={confettiRef} />
    </div>
  );
};