"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Ring } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function MouseParallaxRig() {
  const { camera, pointer } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Smooth camera interpolation towards mouse pointer
    vec.set(pointer.x * 0.8, pointer.y * 0.6, camera.position.z);
    camera.position.lerp(vec, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function QuantumNeuralCore() {
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const outerWireRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y = t * 0.12;
      innerMeshRef.current.rotation.x = Math.sin(t * 0.08) * 0.25;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = -t * 0.09;
      outerWireRef.current.rotation.z = Math.cos(t * 0.07) * 0.2;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2.8 + Math.sin(t * 0.2) * 0.1;
      ring1Ref.current.rotation.z = t * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 3 + Math.cos(t * 0.25) * 0.12;
      ring2Ref.current.rotation.y = -t * 0.18;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group>
        {/* Inner Liquid Core */}
        <Sphere args={[1.5, 64, 64]} ref={innerMeshRef}>
          <MeshDistortMaterial
            color="#07131e"
            emissive="#0df5c8"
            emissiveIntensity={0.25}
            distort={0.45}
            speed={2.2}
            roughness={0.12}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>

        {/* Outer Geometric Wireframe Lattice */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[2.0, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Quantum Orbit Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#0df5c8" transparent opacity={0.5} />
        </mesh>

        {/* Quantum Orbit Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.8, 0.012, 16, 100]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function ConstellationField() {
  const count = 450;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color("#0df5c8");
    const color2 = new THREE.Color("#38bdf8");
    const color3 = new THREE.Color("#818cf8");

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 18;
      pos[idx + 1] = (Math.random() - 0.5) * 18;
      pos[idx + 2] = (Math.random() - 0.5) * 14;

      const mixed =
        i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      col[idx] = mixed.r;
      col[idx + 1] = mixed.g;
      col[idx + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 4]} intensity={2.0} color="#0df5c8" />
        <directionalLight position={[-5, -4, -2]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#818cf8" />
        
        <MouseParallaxRig />
        <QuantumNeuralCore />
        <ConstellationField />
      </Canvas>
    </div>
  );
}
