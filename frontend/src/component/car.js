import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import './component.css'; 

function Model() {
    const modelRef = useRef();
    const { scene } = useGLTF('/ford_mustang.glb');
  
    useFrame(() => {
        // Check if the modelRef.current exists and has a rotation property before trying to update it
        if (modelRef.current && modelRef.current.rotation) {
          modelRef.current.rotation.y += 0.01;
        }
      });
  return <primitive object={scene}  position={[0,0,-2]} scale={3} />;
}

export default function Car() {
  return (
    <Canvas className="canvas">
      <ambientLight intensity={0.5} /> {/* Adds ambient light with half intensity */}
      <directionalLight position={[0, 10, 5]} intensity={4} /> {/* Adds directional light above the model */}
      <Suspense fallback={null}>
        <Model />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
