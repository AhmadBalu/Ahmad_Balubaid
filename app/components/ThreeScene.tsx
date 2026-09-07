"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, Float } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { getAssetPath } from "../utils/assets";

function MouseParallaxRig() {
  const { camera, pointer } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Smooth camera interpolation towards mouse pointer
    vec.set(pointer.x * 0.8, pointer.y * 0.5 + 0.6, 5.8);
    camera.position.lerp(vec, 0.045);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function DeskModel() {
  const { scene } = useGLTF(getAssetPath("/desk1.glb"));
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Gentle cinematic rotation & floating sway
      groupRef.current.rotation.y = -0.45 + Math.sin(t * 0.22) * 0.18;
      groupRef.current.rotation.x = 0.18 + Math.sin(t * 0.18) * 0.04;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef} position={[0, -0.25, 0]}>
        <Center>
          <primitive object={scene} scale={0.23} />
        </Center>
      </group>
    </Float>
  );
}

function ConstellationField() {
  const count = 350;
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
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.04;
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
        size={0.035}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.6, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 8, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-6, 4, -3]} intensity={1.6} color="#0df5c8" />
        <pointLight position={[0, 2.5, 3]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[0, -2, -2]} intensity={0.8} color="#818cf8" />

        <MouseParallaxRig />
        <Suspense fallback={null}>
          <DeskModel />
        </Suspense>
        <ConstellationField />
      </Canvas>
    </div>
  );
}

useGLTF.preload(getAssetPath("/desk1.glb"));
