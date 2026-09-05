"use client";
import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { FiLayers, FiMaximize2, FiActivity, FiCpu, FiRadio, FiCheck, FiRefreshCw } from "react-icons/fi";
import { soundEngine } from "../utils/sound";

type LabArchitecture = "labychecker" | "ararag" | "clinical";

// -------------------------------------------------------------
// SYSTEM 1: LABYCHECKER DISTRIBUTED TELEMETRY MESH (18 Server Nodes)
// -------------------------------------------------------------
function TelemetryClusterScene({ wireframe, paused }: { wireframe: boolean; paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const hubRef = useRef<THREE.Mesh>(null!);
  const packetLineRef = useRef<THREE.LineSegments>(null!);

  // 18 Server Satellites distributed in orbital rings
  const servers = useMemo(() => {
    const names = [
      "Hypixel", "GommeHD", "Laby.net", "CubeCraft", "MMC", "Timolia",
      "PvP Land", "MineHut", "Velt", "BlockMC", "Brisk", "Lunar",
      "CraftingDead", "Vortex", "Archon", "Minemen", "Wynncraft", "Jartex"
    ];
    return names.map((name, i) => {
      const ring = i < 6 ? 1 : i < 12 ? 2 : 3;
      const ringRadius = ring === 1 ? 1.8 : ring === 2 ? 2.6 : 3.3;
      const angle = (i % 6) * (Math.PI / 3) + ring * 0.35;
      const height = (ring - 2) * 0.6 + Math.sin(i) * 0.3;
      return {
        id: i,
        name,
        radius: ringRadius,
        baseAngle: angle,
        y: height,
        speed: (0.35 / ringRadius) * (i % 2 === 0 ? 1 : -0.85),
      };
    });
  }, []);

  // Central hub geometry & packet lines
  const { linePositions } = useMemo(() => {
    const pos: number[] = [];
    servers.forEach((s) => {
      const x = Math.cos(s.baseAngle) * s.radius;
      const z = Math.sin(s.baseAngle) * s.radius;
      pos.push(0, 0, 0, x, s.y, z);
    });
    return { linePositions: new Float32Array(pos) };
  }, [servers]);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (hubRef.current) {
      hubRef.current.rotation.y = t * 0.4;
      hubRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Ingestion Hub (Asynchronous Aggregator Core) */}
      <mesh ref={hubRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.65, 1.4, 8]} />
        <meshStandardMaterial
          color="#0df5c8"
          emissive="#0df5c8"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe={wireframe}
        />
      </mesh>

      {/* Hub Halo Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* 18 Server Satellites */}
      {servers.map((s) => (
        <group key={s.id} position={[Math.cos(s.baseAngle) * s.radius, s.y, Math.sin(s.baseAngle) * s.radius]}>
          <mesh>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial
              color={s.id % 3 === 0 ? "#0df5c8" : s.id % 3 === 1 ? "#38bdf8" : "#818cf8"}
              emissive={s.id % 3 === 0 ? "#0df5c8" : s.id % 3 === 1 ? "#38bdf8" : "#818cf8"}
              emissiveIntensity={0.5}
              wireframe={wireframe}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Telemetry Ingestion Laser Rays */}
      <lineSegments ref={packetLineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0df5c8"
          transparent
          opacity={0.25}
        />
      </lineSegments>

      {/* Ground Coordinate Grid */}
      <gridHelper args={[8, 16, "#0df5c8", "#1e293b"]} position={[0, -1.8, 0]} />
    </group>
  );
}

// -------------------------------------------------------------
// SYSTEM 2: ARARAG HIGH-DIMENSIONAL VECTOR SPACE (IEEE Published)
// -------------------------------------------------------------
function VectorSpaceScene({ wireframe, paused }: { wireframe: boolean; paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const probeRef = useRef<THREE.Group>(null!);

  // 3 Semantic Clusters: Commercial Law (cyan), Civil Transactions (emerald), Penal Code (violet)
  const { cluster1, cluster2, cluster3, queryPoint, nearestLines } = useMemo(() => {
    const makeCluster = (center: [number, number, number], count: number, spread: number) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        arr[idx] = center[0] + (Math.random() - 0.5) * spread;
        arr[idx + 1] = center[1] + (Math.random() - 0.5) * spread;
        arr[idx + 2] = center[2] + (Math.random() - 0.5) * spread;
      }
      return arr;
    };

    const c1 = makeCluster([-1.6, 0.8, -0.6], 45, 1.4); // Civil Code
    const c2 = makeCluster([1.5, -0.4, 0.8], 50, 1.5);  // Commercial
    const c3 = makeCluster([0.2, 1.4, 1.2], 40, 1.3);   // Penal Code

    const qp: [number, number, number] = [-0.6, 0.5, 0.2];

    // Find top-3 closest vectors to queryPoint
    const lines: number[] = [];
    for (let k = 0; k < 3; k++) {
      const cx = c1[k * 3];
      const cy = c1[k * 3 + 1];
      const cz = c1[k * 3 + 2];
      lines.push(qp[0], qp[1], qp[2], cx, cy, cz);
    }

    return {
      cluster1: c1,
      cluster2: c2,
      cluster3: c3,
      queryPoint: qp,
      nearestLines: new Float32Array(lines),
    };
  }, []);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.14;
    }
    if (probeRef.current) {
      probeRef.current.position.y = queryPoint[1] + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cluster 1 (Civil Code - Emerald) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cluster1, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#0df5c8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Cluster 2 (Commercial Law - Cyan) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cluster2, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Cluster 3 (Penal Statutes - Violet) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cluster3, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#818cf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Query Vector Probe (Floating Beacon) */}
      <group ref={probeRef} position={queryPoint}>
        <mesh>
          <tetrahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#0df5c8"
            emissiveIntensity={1}
            wireframe={wireframe}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Nearest Neighbor Semantic Similarity Rays (Cosine = 0.942) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearestLines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.65} />
      </lineSegments>

      {/* 3D Coordinate Space Grid */}
      <gridHelper args={[7, 14, "#38bdf8", "#1e293b"]} position={[0, -1.8, 0]} />
    </group>
  );
}

// -------------------------------------------------------------
// SYSTEM 3: CLINICAL MI DECISION HYPER-MANIFOLD (Healthcare ML)
// -------------------------------------------------------------
function ClinicalManifoldScene({ wireframe, paused }: { wireframe: boolean; paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { planeGeo, patientPoints } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(5.5, 5.5, 36, 36);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const z = Math.sin(u * 1.1) * Math.cos(v * 1.1) * 0.75 + Math.sin(u * 2.0) * 0.2;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();

    // Patient classification points on manifold
    const pts: number[] = [];
    for (let j = 0; j < 80; j++) {
      const px = (Math.random() - 0.5) * 4.2;
      const py = (Math.random() - 0.5) * 4.2;
      const pz = Math.sin(px * 1.1) * Math.cos(py * 1.1) * 0.75 + 0.15;
      pts.push(px, py, pz);
    }

    return { planeGeo: geo, patientPoints: new Float32Array(pts) };
  }, []);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.1;
      groupRef.current.rotation.x = -Math.PI / 3 + Math.sin(t * 0.15) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Parametric Decision Boundary Manifold */}
      <mesh ref={meshRef} geometry={planeGeo}>
        <meshStandardMaterial
          color="#06121f"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Patient Outcome Vectors (High vs Low Complication Risk) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[patientPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#0df5c8"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Ground Coordinate Plane */}
      <gridHelper args={[6, 12, "#818cf8", "#1e293b"]} position={[0, 0, -1.2]} />
    </group>
  );
}

// -------------------------------------------------------------
// MAIN INTERACTIVE 3D LAB VIEWPORT COMPONENT
// -------------------------------------------------------------
export default function ThreeDLab() {
  const [activeArch, setActiveArch] = useState<LabArchitecture>("labychecker");
  const [wireframe, setWireframe] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleArchSwitch = (arch: LabArchitecture) => {
    setActiveArch(arch);
    soundEngine.playClick();
  };

  const handleWireframeToggle = () => {
    setWireframe(!wireframe);
    soundEngine.playHover();
  };

  const handlePauseToggle = () => {
    setPaused(!paused);
    soundEngine.playHover();
  };

  const handlePing = () => {
    soundEngine.playTelemetryPulse();
  };

  return (
    <section id="holodeck" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0df5c8] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#0df5c8]">
              REAL-TIME WEBGL SPATIAL ENGINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold text-white tracking-tight">
            Interactive 3D Systems Holodeck
          </h2>
          <p className="text-sm text-slate-400 font-light mt-2 max-w-xl">
            Manipulate, rotate, and inspect Ahmad&apos;s flagship system architectures in a multi-axis 3D WebGL coordinate space.
          </p>
        </div>

        {/* Architecture Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleArchSwitch("labychecker")}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeArch === "labychecker"
                ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/60 shadow-[0_0_15px_rgba(13,245,200,0.25)] font-medium"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <FiRadio className="text-sm" />
            <span>01 // TELEMETRY CLUSTER</span>
          </button>

          <button
            onClick={() => handleArchSwitch("ararag")}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeArch === "ararag"
                ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.25)] font-medium"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <FiCpu className="text-sm" />
            <span>02 // VECTOR SPACE (IEEE)</span>
          </button>

          <button
            onClick={() => handleArchSwitch("clinical")}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeArch === "clinical"
                ? "bg-[#818cf8]/20 text-[#818cf8] border border-[#818cf8]/60 shadow-[0_0_15px_rgba(129,140,248,0.25)] font-medium"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <FiActivity className="text-sm" />
            <span>03 // CLINICAL MANIFOLD</span>
          </button>
        </div>
      </div>

      {/* 3D Holodeck Interactive Viewport Frame */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-[#04070d] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Subtle High-Tech Corner Reticles */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[10px] text-slate-500 flex flex-col gap-0.5">
          <div className="text-[#0df5c8] flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0df5c8] animate-pulse" />
            <span>THREE.JS ENGINE // 60 FPS</span>
          </div>
          <span>ROT: 360° SPHERICAL DAMPING</span>
          <span>DRAG TO ROTATE 3D SPATIAL MODEL</span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none font-mono text-[10px] text-slate-400 hidden sm:flex flex-col items-end gap-1">
          <div className="px-2.5 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md">
            {activeArch === "labychecker" && "SYSTEM: 18-NODE TELEMETRY PIPELINE"}
            {activeArch === "ararag" && "SYSTEM: HIGH-DIMENSIONAL ARABIC RAG EMBEDDINGS"}
            {activeArch === "clinical" && "SYSTEM: CLINICAL MI DECISION SURFACE"}
          </div>
        </div>

        {/* The 3D Canvas */}
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[6, 8, 5]} intensity={2.5} color="#0df5c8" />
            <directionalLight position={[-6, -6, -4]} intensity={1.8} color="#38bdf8" />
            <pointLight position={[0, 0, 3]} intensity={1.5} color="#818cf8" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.8}
              dampingFactor={0.06}
            />

            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
              {activeArch === "labychecker" && (
                <TelemetryClusterScene wireframe={wireframe} paused={paused} />
              )}
              {activeArch === "ararag" && (
                <VectorSpaceScene wireframe={wireframe} paused={paused} />
              )}
              {activeArch === "clinical" && (
                <ClinicalManifoldScene wireframe={wireframe} paused={paused} />
              )}
            </Float>
          </Canvas>
        </div>

        {/* Bottom Interactive HUD Dock */}
        <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Telemetry metrics pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-slate-300">
            {activeArch === "labychecker" && (
              <>
                <span className="text-[#0df5c8]">NODES: 18 SERVERS</span>
                <span className="text-white/20">|</span>
                <span>LATENCY: &lt; 5.0s STREAM</span>
                <span className="text-white/20">|</span>
                <span className="text-emerald-400">BYPASS: TRAWL</span>
              </>
            )}
            {activeArch === "ararag" && (
              <>
                <span className="text-[#38bdf8]">RETRIEVAL ACCURACY: 94.2%</span>
                <span className="text-white/20">|</span>
                <span>LATENCY: &lt; 240ms</span>
                <span className="text-white/20">|</span>
                <span className="text-emerald-400">IEEE XPLORE</span>
              </>
            )}
            {activeArch === "clinical" && (
              <>
                <span className="text-[#818cf8]">SUPERVISED CLASSIFICATION</span>
                <span className="text-white/20">|</span>
                <span>COHORT: 1,700 PATIENTS</span>
                <span className="text-white/20">|</span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </>
            )}
          </div>

          {/* Quick HUD controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWireframeToggle}
              className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                wireframe
                  ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/60"
                  : "bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <FiLayers className="text-xs" />
              <span>{wireframe ? "WIREFRAME: ON" : "SOLID SHADING"}</span>
            </button>

            <button
              onClick={handlePauseToggle}
              className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                paused
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/60"
                  : "bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <FiRefreshCw className={`text-xs ${paused ? "" : "animate-spin"}`} />
              <span>{paused ? "PAUSED" : "KINETIC"}</span>
            </button>

            <button
              onClick={handlePing}
              className="px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-[#0df5c8]/10 hover:bg-[#0df5c8]/25 text-[#0df5c8] border border-[#0df5c8]/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>⚡</span>
              <span>PING TELEMETRY</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
