import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import "./component.css";

function Model() {
  // const modelRef = useRef();
  // const { scene } = useGLTF("/ford_mustang.glb");

  // console.log(modelRef); 
  // // console.log(modelRef.current.rotation); 
  // useFrame((state, delta) => {
  //   if (modelRef.current && modelRef.current.rotation) {
  //     modelRef.current.rotation.y += delta * 0.5; // Rotates the model on its Y-axis
  //   }
  // });

  const { scene } = useGLTF("/ford_mustang.glb");
  const [rotationY, setRotationY] = useState(0); // State to hold rotation value

  useFrame((state, delta) => {
    setRotationY((prevRotation) => prevRotation + delta * 0.25); // Update rotation value
  });

  return <primitive
  object={scene}
  position={[1, 0, -0.1]}
  rotation={[0, rotationY, 0]}
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


// import { Suspense, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// function Model() {
//   const { scene } = useGLTF("/ford_mustang.glb");
//   const [rotationY, setRotationY] = useState(0); // State to hold rotation value

//   useFrame((state, delta) => {
//     setRotationY((prevRotation) => prevRotation + delta * 0.5); // Update rotation value
//   });

//   return (
//     <primitive
//       object={scene}
//       position={[0, 0, -0.1]}
//       rotation={[0, rotationY, 0]} // Apply dynamic rotation
//       scale={6}
//     />
//   );
// }

// export default function Car() {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[0, 10, 5]} intensity={4} />
//       <Suspense fallback={null}>
//         <Model />
//         <OrbitControls enableZoom enablePan minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
//       </Suspense>
//     </Canvas>
//   );
// }
