import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import "./component.css";

function Model() {
  const modelRef = useRef();
  const { scene } = useGLTF("/ford_mustang.glb");

  useFrame((state, delta) => {
    if (modelRef.current && modelRef.current.rotation) {
      modelRef.current.rotation.y += delta * 0.5; // Rotates the model on its Y-axis
    }
  });
  return <primitive
  object={scene}
  position={[0, 0, -0.1]}
  rotation={[0, 1.5, 0]}
  scale={6}
/>;
}

export default function Car() {
  return (
    <Canvas className="canvas">
      <ambientLight intensity={0.5} />{" "}
      {/* Adds ambient light with half intensity */}
      <directionalLight position={[0, 10, 5]} intensity={4} />{" "}
      {/* Adds directional light above the model */}
      <Suspense fallback={null}>
        <Model />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}
