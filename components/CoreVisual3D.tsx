"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface SkillBadgeData {
  name: string;
  pos: [number, number, number];
  color: string;
}

const SKILL_BADGES: SkillBadgeData[] = [
  { name: "Next.js", pos: [-2.1, 1.3, 0.4], color: "bg-black" },
  { name: "NestJS", pos: [2.1, 1.2, -0.3], color: "bg-red-500" },
  { name: "PostgreSQL", pos: [-2.0, -1.1, -0.2], color: "bg-sky-600" },
  { name: "Prisma ORM", pos: [2.0, -0.9, 0.5], color: "bg-teal-600" },
  { name: "Docker", pos: [-1.2, -2.0, 0.3], color: "bg-blue-500" },
  { name: "Redis", pos: [1.3, 2.0, -0.2], color: "bg-rose-600" },
];

function CoreScene({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * 0.35;
      outerMeshRef.current.rotation.x += delta * 0.2;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.5;
      innerMeshRef.current.rotation.z += delta * 0.3;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.15;
      wireframeRef.current.rotation.x -= delta * 0.1;
    }

    if (groupRef.current) {
      if (!isMobile) {
        const targetRotX = state.pointer.y * 0.32;
        const targetRotY = state.pointer.x * 0.38;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetRotX,
          delta * 3.5
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotY,
          delta * 3.5
        );
      } else {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
        groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={outerMeshRef} scale={1.4}>
          <icosahedronGeometry args={[1, isMobile ? 0 : 1]} />
          <meshPhysicalMaterial
            color="#0284C7"
            roughness={0.22}
            metalness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.12}
            transmission={0.25}
            ior={1.45}
            thickness={0.8}
            reflectivity={0.9}
          />
        </mesh>

        <mesh ref={innerMeshRef} scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#6366F1"
            emissive="#10B981"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <lineSegments ref={wireframeRef} scale={1.75}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 0)]} />
          <lineBasicMaterial color="#76C0EC" transparent opacity={0.35} />
        </lineSegments>

        {SKILL_BADGES.map((badge) => (
          <Html
            key={badge.name}
            position={badge.pos}
            center
            distanceFactor={9.5}
            className="pointer-events-none select-none"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-md shadow-zinc-950/5 text-[11px] font-mono font-bold text-zinc-900 whitespace-nowrap transform hover:scale-105 transition-all">
              <span className={`w-2 h-2 rounded-full ${badge.color}`} />
              <span>{badge.name}</span>
            </div>
          </Html>
        ))}
      </Float>

      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.35}
        scale={6.5}
        blur={2.2}
        far={4}
        color="#0284C7"
      />
    </group>
  );
}

function FallbackSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-sky-200/60 bg-sky-50/40 animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-sky-300/60 bg-sky-100/30" />
      </div>
    </div>
  );
}

export default function CoreVisual3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Suspense fallback={<FallbackSkeleton />}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5.8], fov: 45 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={2.2} color="#F0F9FF" />
          <pointLight position={[-6, -4, -3]} intensity={1.8} color="#818CF8" />
          <pointLight position={[4, -3, 4]} intensity={1.4} color="#34D399" />
          <pointLight position={[0, 5, -2]} intensity={1.2} color="#76C0EC" />

          <CoreScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
