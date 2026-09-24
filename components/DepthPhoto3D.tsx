"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

const DISPLACEMENT_SCALE = 0.35;

function DepthPlane({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const [colorMap, depthMap] = useTexture([
    "/images/profile-photo.png",
    "/images/profile-depth.png",
  ]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!isMobile) {
      const targetRotX = -state.pointer.y * 0.12;
      const targetRotY = state.pointer.x * 0.15;
      const targetCamX = state.pointer.x * 0.2;
      const targetCamY = state.pointer.y * 0.15;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX,
        delta * 4.5
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotY,
        delta * 4.5
      );

      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        targetCamX,
        delta * 4.5
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        targetCamY,
        delta * 4.5
      );
      state.camera.lookAt(0, 0, 0);
    } else {
      const idleX = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      const idleY = Math.cos(state.clock.elapsedTime * 0.6) * 0.05;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        idleX,
        delta * 3
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        idleY,
        delta * 3
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
      <planeGeometry args={[3.2, 4.8, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={depthMap}
        displacementScale={DISPLACEMENT_SCALE}
        displacementBias={-0.08}
        roughness={0.25}
        metalness={0.0}
      />
    </mesh>
  );
}

function PhotoFallback() {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white flex items-center justify-center">
      <Image
        src="/images/profile-photo.png"
        alt="Mohammad Kevin"
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover rounded-2xl"
        priority
      />
    </div>
  );
}

export default function DepthPhoto3D() {
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
    <div className="w-full h-[450px] sm:h-[500px] relative rounded-3xl p-2.5 bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl shadow-zinc-950/8 overflow-hidden group">
      <div className="w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#F0F9FF] to-[#FAF8F1] relative">
        <Suspense fallback={<PhotoFallback />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4.2], fov: 42 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            className="w-full h-full"
          >
            <ambientLight intensity={1.6} />
            <directionalLight position={[3, 5, 5]} intensity={1.5} color="#FFFFFF" />
            <directionalLight position={[-3, -2, 4]} intensity={0.9} color="#F0F9FF" />
            <pointLight position={[0, 1, 3]} intensity={0.8} color="#FFFFFF" />

            <DepthPlane isMobile={isMobile} />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center justify-between text-xs font-semibold text-[#1C1B1D] border border-white/80 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">Mohammad Kevin</span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
          3D Interactive Depth
        </span>
      </div>
    </div>
  );
}
