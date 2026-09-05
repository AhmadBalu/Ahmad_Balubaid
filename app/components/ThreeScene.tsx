"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { soundEngine } from "../utils/sound";

export type SceneMode = "gyroscope" | "neural" | "singularity";

// 1. Mouse Parallax Camera Rig (smooth subtle drift)
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    target.set(pointer.x * 0.6, pointer.y * 0.4, 5.5);
    camera.position.lerp(target, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 2. Interactive Shockwave Ripple on Click
function ClickShockwave({ trigger }: { trigger: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (trigger > 0) {
      setScale(0.1);
      setOpacity(0.9);
    }
  }, [trigger]);

  useFrame((_, delta) => {
    if (opacity > 0.01) {
      setScale((prev) => prev + delta * 5.5);
      setOpacity((prev) => Math.max(0, prev - delta * 1.8));
      if (meshRef.current) {
        meshRef.current.scale.set(scale, scale, 1);
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1.05, 64]} />
      <meshBasicMaterial
        color="#0df5c8"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// ARCHITECTURE 1: QUANTUM CHRONOMETER (Armillary Gyroscope Core)
// -------------------------------------------------------------
function QuantumGyroscope() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const cageRef = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Group>(null!);
  const ring2 = useRef<THREE.Group>(null!);
  const ring3 = useRef<THREE.Group>(null!);
  const photon1 = useRef<THREE.Mesh>(null!);
  const photon2 = useRef<THREE.Mesh>(null!);
  const photon3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25;
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    }
    if (cageRef.current) {
      cageRef.current.rotation.y = -t * 0.15;
      cageRef.current.rotation.z = Math.cos(t * 0.12) * 0.25;
    }
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.25;
      ring1.current.rotation.y = Math.sin(t * 0.2) * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.2;
      ring2.current.rotation.z = Math.cos(t * 0.22) * 0.3;
    }
    if (ring3.current) {
      ring3.current.rotation.z = -t * 0.18;
      ring3.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.14) * 0.25;
    }

    const r1 = 2.05;
    const r2 = 2.45;
    const r3 = 2.85;
    if (photon1.current) {
      photon1.current.position.set(
        Math.cos(t * 1.6) * r1,
        Math.sin(t * 1.6) * r1,
        0
      );
    }
    if (photon2.current) {
      photon2.current.position.set(
        Math.cos(-t * 1.3) * r2,
        0,
        Math.sin(-t * 1.3) * r2
      );
    }
    if (photon3.current) {
      photon3.current.position.set(
        0,
        Math.cos(t * 1.1) * r3,
        Math.sin(t * 1.1) * r3
      );
    }
  });

  return (
    <group>
      {/* Faceted Crystalline Octahedron Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#050a12"
          emissive="#0df5c8"
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.92}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.95}
        />
      </mesh>

      {/* Outer Geodesic Icosahedron Wireframe */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0df5c8"
          emissiveIntensity={0.45}
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* Ring 1 - Emerald Primary */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[2.05, 0.015, 16, 128]} />
          <meshStandardMaterial
            color="#0df5c8"
            emissive="#0df5c8"
            emissiveIntensity={0.7}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={photon1}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Ring 2 - Cyan Secondary */}
      <group ref={ring2}>
        <mesh>
          <torusGeometry args={[2.45, 0.012, 16, 128]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh ref={photon2}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Ring 3 - Violet Tertiary */}
      <group ref={ring3}>
        <mesh>
          <torusGeometry args={[2.85, 0.01, 16, 128]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#818cf8"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh ref={photon3}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#0df5c8" />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// ARCHITECTURE 2: NEURAL SYNAPSE CORTEX (AI Graph Network)
// -------------------------------------------------------------
function NeuralCortex() {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = 95;
    const positions: number[] = [];
    const radius = 2.1;

    // Golden spiral sphere distribution (Fibonacci lattice)
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = radius + (Math.random() - 0.5) * 0.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.push(x, y, z);
    }

    // Connect proximate nodes with synaptic axons
    const connections: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.1) {
          connections.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return {
      nodePositions: new Float32Array(positions),
      linePositions: new Float32Array(connections),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Quantum Data Nucleus */}
      <mesh>
        <dodecahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#0df5c8"
          emissive="#0df5c8"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Inner Glowing Crystal Core */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Neural Nodes (Point Cloud) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#0df5c8"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Synaptic Axon Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.32}
        />
      </lineSegments>
    </group>
  );
}

// -------------------------------------------------------------
// ARCHITECTURE 3: RELATIVISTIC SINGULARITY (Cyber Accretion Vortex)
// -------------------------------------------------------------
function RelativisticSingularity() {
  const diskRef = useRef<THREE.Points>(null!);
  const jetRef = useRef<THREE.Points>(null!);
  const horizonRef = useRef<THREE.Mesh>(null!);

  const { diskPositions, diskSpeeds, diskRadii } = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const r = 1.1 + Math.pow(Math.random(), 1.8) * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const thickness = (r - 1.0) * 0.12 * (Math.random() - 0.5);

      positions[idx] = Math.cos(angle) * r;
      positions[idx + 1] = thickness;
      positions[idx + 2] = Math.sin(angle) * r;

      radii[i] = r;
      // Keplerian differential rotation: v ~ 1 / sqrt(r)
      speeds[i] = (1.6 / Math.sqrt(r)) * (0.85 + Math.random() * 0.3);
    }
    return { diskPositions: positions, diskSpeeds: speeds, diskRadii: radii };
  }, []);

  const { jetPositions } = useMemo(() => {
    const jetCount = 280;
    const positions = new Float32Array(jetCount * 3);
    for (let i = 0; i < jetCount; i++) {
      const idx = i * 3;
      const sign = i % 2 === 0 ? 1 : -1;
      const y = sign * (0.8 + Math.random() * 3.2);
      const spread = (Math.abs(y) / 3.2) * 0.35;
      const angle = Math.random() * Math.PI * 2;
      positions[idx] = Math.cos(angle) * spread * Math.random();
      positions[idx + 1] = y;
      positions[idx + 2] = Math.sin(angle) * spread * Math.random();
    }
    return { jetPositions: positions };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (diskRef.current) {
      const geo = diskRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < diskSpeeds.length; i++) {
        const idx = i * 3;
        const currentX = arr[idx];
        const currentZ = arr[idx + 2];
        const currentAngle = Math.atan2(currentZ, currentX);
        const newAngle = currentAngle + diskSpeeds[i] * 0.018;
        const r = diskRadii[i];

        arr[idx] = Math.cos(newAngle) * r;
        arr[idx + 2] = Math.sin(newAngle) * r;
      }
      posAttr.needsUpdate = true;
      diskRef.current.rotation.x = 0.45;
      diskRef.current.rotation.z = Math.sin(t * 0.1) * 0.15;
    }

    if (jetRef.current) {
      jetRef.current.rotation.y = t * 0.8;
      jetRef.current.rotation.x = 0.45;
    }

    if (horizonRef.current) {
      horizonRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group>
      {/* Event Horizon (Pitch-black absorbing sphere) */}
      <mesh ref={horizonRef}>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Iridescent Photon Sphere Halo */}
      <mesh rotation={[0.45, 0, 0]}>
        <ringGeometry args={[0.96, 1.08, 64]} />
        <meshBasicMaterial
          color="#0df5c8"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Swirling Accretion Disk Particles */}
      <points ref={diskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[diskPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#38bdf8"
          sizeAttenuation
          transparent
          opacity={0.75}
        />
      </points>

      {/* Relativistic Polar Plasma Jets */}
      <points ref={jetRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[jetPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#0df5c8"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}

// -------------------------------------------------------------
// 4. PRECISION STAR FIELD
// -------------------------------------------------------------
function PrecisionStarField() {
  const count = 350;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 18;
      pos[idx + 1] = (Math.random() - 0.5) * 18;
      pos[idx + 2] = (Math.random() - 0.5) * 14;
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color="#0df5c8"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// -------------------------------------------------------------
// MAIN THREE SCENE WITH INTERACTIVE MODE SELECTION
// -------------------------------------------------------------
interface ThreeSceneProps {
  currentMode?: SceneMode;
  onModeSelect?: (mode: SceneMode) => void;
  interactive?: boolean;
}

export default function ThreeScene({
  currentMode = "gyroscope",
  onModeSelect,
  interactive = true,
}: ThreeSceneProps) {
  const [activeMode, setActiveMode] = useState<SceneMode>(currentMode);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (currentMode) {
      setActiveMode(currentMode);
    }
  }, [currentMode]);

  const handleCanvasClick = () => {
    setPulseCount((c) => c + 1);
    soundEngine.playTelemetryPulse();
  };

  const handleModeChange = (mode: SceneMode) => {
    setActiveMode(mode);
    soundEngine.playClick();
    if (onModeSelect) onModeSelect(mode);
  };

  return (
    <div className="relative w-full h-full group select-none">
      {/* 3D WebGL Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing" onClick={handleCanvasClick}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[5, 6, 4]}
            intensity={2.2}
            color="#0df5c8"
          />
          <directionalLight
            position={[-5, -4, -3]}
            intensity={1.6}
            color="#38bdf8"
          />
          <pointLight position={[0, 0, 2.5]} intensity={1.4} color="#818cf8" />

          <CameraRig />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.7}
            dampingFactor={0.05}
          />

          <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.5}>
            {activeMode === "gyroscope" && <QuantumGyroscope />}
            {activeMode === "neural" && <NeuralCortex />}
            {activeMode === "singularity" && <RelativisticSingularity />}
          </Float>

          <ClickShockwave trigger={pulseCount} />
          <PrecisionStarField />
        </Canvas>
      </div>

      {/* High-Tech HUD Mode Selector Dock */}
      {interactive && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-subtle border border-white/15 bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-300 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-1.5 px-2 font-mono text-[9px] uppercase tracking-widest text-slate-400 border-r border-white/10 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0df5c8] animate-ping" />
            <span>3D WEBGL CORE //</span>
          </div>

          <button
            onClick={() => handleModeChange("gyroscope")}
            className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider transition-all duration-200 cursor-pointer ${
              activeMode === "gyroscope"
                ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/50 shadow-[0_0_12px_rgba(13,245,200,0.3)] font-medium"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            ⚛️ QUANTUM CORE
          </button>

          <button
            onClick={() => handleModeChange("neural")}
            className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider transition-all duration-200 cursor-pointer ${
              activeMode === "neural"
                ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/50 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-medium"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            🧠 NEURAL SYNAPSE
          </button>

          <button
            onClick={() => handleModeChange("singularity")}
            className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider transition-all duration-200 cursor-pointer ${
              activeMode === "singularity"
                ? "bg-[#818cf8]/20 text-[#818cf8] border border-[#818cf8]/50 shadow-[0_0_12px_rgba(129,140,248,0.3)] font-medium"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            🌀 VORTEX SINGULARITY
          </button>

          <button
            onClick={handleCanvasClick}
            title="Click to trigger shockwave pulse"
            className="px-2.5 py-1 rounded-full font-mono text-[10px] text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>⚡</span>
            <span className="hidden md:inline">PULSE</span>
          </button>
        </div>
      )}
    </div>
  );
}
