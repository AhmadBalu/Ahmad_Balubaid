"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// 1. Smooth Mouse Parallax Camera Rig
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Subtle tilt following pointer
    target.set(pointer.x * 0.7, pointer.y * 0.5, 5.5);
    camera.position.lerp(target, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Faceted Crystalline Core (Geometric Octahedron + Wireframe Cage)
function CrystalCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.z = Math.cos(t * 0.12) * 0.25;
    }
  });

  return (
    <group>
      {/* Inner Obsidian Crystal Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshPhysicalMaterial
          color="#060d17"
          emissive="#0df5c8"
          emissiveIntensity={0.25}
          roughness={0.12}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Outer Precision Wireframe Cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0df5c8"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// 3. Kinetic Gyroscopic Armillary Rings with Orbiting Data Photons
function GyroscopeRings() {
  const ringX = useRef<THREE.Group>(null!);
  const ringY = useRef<THREE.Group>(null!);
  const ringZ = useRef<THREE.Group>(null!);
  const photon1 = useRef<THREE.Mesh>(null!);
  const photon2 = useRef<THREE.Mesh>(null!);
  const photon3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ringX.current) {
      ringX.current.rotation.x = t * 0.22;
      ringX.current.rotation.y = Math.sin(t * 0.15) * 0.3;
    }
    if (ringY.current) {
      ringY.current.rotation.y = t * 0.18;
      ringY.current.rotation.z = Math.cos(t * 0.2) * 0.3;
    }
    if (ringZ.current) {
      ringZ.current.rotation.z = -t * 0.14;
      ringZ.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.1) * 0.2;
    }

    // Orbiting data photons along the ring paths
    const radius1 = 2.05;
    const radius2 = 2.4;
    const radius3 = 2.75;

    if (photon1.current) {
      photon1.current.position.set(
        Math.cos(t * 1.5) * radius1,
        Math.sin(t * 1.5) * radius1,
        0
      );
    }
    if (photon2.current) {
      photon2.current.position.set(
        Math.cos(-t * 1.2) * radius2,
        0,
        Math.sin(-t * 1.2) * radius2
      );
    }
    if (photon3.current) {
      photon3.current.position.set(
        0,
        Math.cos(t * 0.9) * radius3,
        Math.sin(t * 0.9) * radius3
      );
    }
  });

  return (
    <group>
      {/* Primary Ring (Alpha) */}
      <group ref={ringX}>
        <mesh>
          <torusGeometry args={[2.05, 0.013, 16, 120]} />
          <meshStandardMaterial
            color="#0df5c8"
            emissive="#0df5c8"
            emissiveIntensity={0.65}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Orbiting Photon 1 */}
        <mesh ref={photon1}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Secondary Ring (Beta) */}
      <group ref={ringY}>
        <mesh>
          <torusGeometry args={[2.4, 0.011, 16, 120]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.55}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Orbiting Photon 2 */}
        <mesh ref={photon2}>
          <sphereGeometry args={[0.034, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Tertiary Outer Ring (Gamma) */}
      <group ref={ringZ}>
        <mesh>
          <torusGeometry args={[2.75, 0.009, 16, 120]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#818cf8"
            emissiveIntensity={0.45}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>
        {/* Orbiting Photon 3 */}
        <mesh ref={photon3}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#0df5c8" />
        </mesh>
      </group>
    </group>
  );
}

// 4. Subtle Pinprick Star Field
function PrecisionStarField() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 16;
      pos[idx + 1] = (Math.random() - 0.5) * 16;
      pos[idx + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
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
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#0df5c8" />
        <directionalLight position={[-5, -4, -3]} intensity={1.6} color="#38bdf8" />
        <pointLight position={[0, 0, 2.5]} intensity={1.2} color="#818cf8" />

        <CameraRig />

        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
          <CrystalCore />
          <GyroscopeRings />
        </Float>

        <PrecisionStarField />
      </Canvas>
    </div>
  );
}
