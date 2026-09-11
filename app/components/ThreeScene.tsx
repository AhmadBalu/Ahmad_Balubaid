"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { getAssetPath } from "../utils/assets";

const TARGET_Y = -1.409; // Monitor and chair facing directly forward towards the camera
const INITIAL_Y = TARGET_Y - Math.PI / 2; // 45 degrees offset showing the right profile of the desk setup

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
        if (mat && mat.name === "Screen") {
          // Keep Screen emissive at black so the embedded image texture displays with true colors and zero white blowout
          mat.emissive = new THREE.Color("#000000");
          mat.emissiveIntensity = 0;
          mat.roughness = 0.6; // Soft matte screen surface to prevent harsh specular white glare
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current) return;

    let tween: gsap.core.Tween | null = null;

    const startEntranceAnimation = () => {
      if (tween || !groupRef.current) return;
      groupRef.current.rotation.y = INITIAL_Y;
      tween = gsap.to(groupRef.current.rotation, {
        y: TARGET_Y,
        duration: 2.0,
        ease: "power2.out",
        delay: 0.1,
      });
    };

    const onUserInteract = () => {
      if (tween && tween.isActive()) {
        tween.kill();
      }
    };

    if (typeof window !== "undefined") {
      const isLoaded = (window as unknown as { __PORTFOLIO_LOADED__?: boolean }).__PORTFOLIO_LOADED__;
      if (isLoaded) {
        startEntranceAnimation();
      } else {
        window.addEventListener("portfolio:page-loaded", startEntranceAnimation, { once: true });
      }
      window.addEventListener("portfolio:stop-entrance", onUserInteract);
    }

    const fallback = setTimeout(startEntranceAnimation, 1200);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("portfolio:page-loaded", startEntranceAnimation);
        window.removeEventListener("portfolio:stop-entrance", onUserInteract);
      }
      clearTimeout(fallback);
      if (tween) tween.kill();
    };
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.22, 0]} rotation={[0.04, INITIAL_Y, 0]}>
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

function InteractiveControls() {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("portfolio:stop-entrance"));
      }
    };

    controls.addEventListener("start", onStart);
    return () => {
      controls.removeEventListener("start", onStart);
    };
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.018}
      rotateSpeed={1.25}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2 + 0.12}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
      }}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
      }}
    />
  );
}

export default function ThreeScene() {
  return (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas
        camera={{ position: [0, 0.75, 5.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 3, 2]} intensity={1.2} color="#0df5c8" />
        <directionalLight position={[5, -2, -3]} intensity={1.0} color="#38bdf8" />
        <pointLight position={[0, 2.5, 3]} intensity={0.6} color="#ffffff" />

        <InteractiveControls />

        <Suspense fallback={null}>
          <DeskModel />
        </Suspense>
        <ConstellationField />
      </Canvas>
    </div>
  );
}

useGLTF.preload(getAssetPath("/desk1.glb"));
