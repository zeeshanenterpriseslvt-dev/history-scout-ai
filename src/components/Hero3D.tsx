import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const FloatingOrb = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#d4af37"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#d4af37" intensity={0.5} />
      
      <FloatingOrb position={[-3, 2, 0]} />
      <FloatingOrb position={[3, -1, -2]} />
      <FloatingOrb position={[0, 3, -1]} />
      
      {/* Removed Text3D for now as font may not be available */}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};