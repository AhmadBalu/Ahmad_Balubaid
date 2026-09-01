"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const particlePositions = new Float32Array(1000 * 3);
for (let i = 0; i < 1000 * 3; i++) {
  particlePositions[i] = (Math.random() - 0.5) * 10;
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group>
      <Sphere args={[1.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#00FFFF"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#FFD700" transparent opacity={0.6} />
      </points>
    </group>
  );
}

function InteractiveGlobe() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#00FFFF" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#FFD700" />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

export default function ThreeScene() {
  return <InteractiveGlobe />;
}
