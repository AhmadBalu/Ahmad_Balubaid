"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { getAssetPath } from "../utils/assets";

function DeskModel() {
  const { scene } = useGLTF(getAssetPath("/desk1.glb"));
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && (mat.name === "Screen" || mat.name === "screen.002")) {
          // Enhance screen luminosity so the embedded photo is clearly visible and backlit
          if (mat.map) {
            mat.emissiveMap = mat.map;
            mat.emissive = new THREE.Color("#ffffff");
            mat.emissiveIntensity = 0.4;
          }
        }
      }
    });
  }, [scene]);

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.25}>
      {/* -1.409 rad (-80.7 deg) rotates the model so the monitor and chair face directly towards the camera */}
      <group ref={groupRef} position={[0, -0.22, 0]} rotation={[0.04, -1.409, 0]}>
        <Center>
          <primitive object={scene} scale={0.38} />
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
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas
        camera={{ position: [0, 0.8, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[0, 5, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-6, 4, 3]} intensity={1.6} color="#0df5c8" />
        <directionalLight position={[6, 4, 3]} intensity={1.4} color="#38bdf8" />
        <pointLight position={[0, 1.2, 3.5]} intensity={1.8} color="#ffffff" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.06}
        />

        <Suspense fallback={null}>
          <DeskModel />
        </Suspense>
        <ConstellationField />
      </Canvas>
    </div>
  );
}

useGLTF.preload(getAssetPath("/desk1.glb"));
