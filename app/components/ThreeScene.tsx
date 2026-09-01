"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function IridescentLiquidCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <Sphere args={[1.6, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#0b1726"
          emissive="#0df5c8"
          emissiveIntensity={0.18}
          distort={0.38}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

function StarDust() {
  const count = 350;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 14;
      pos[i + 1] = (Math.random() - 0.5) * 14;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#0df5c8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#0df5c8" />
        <directionalLight position={[-4, -3, -2]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#818cf8" />
        <IridescentLiquidCore />
        <StarDust />
      </Canvas>
    </div>
  );
}

