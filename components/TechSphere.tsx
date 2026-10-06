"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { Group } from "three";

function TechSphereContent() {
  const group = useRef<Group>(null);
  const techs = [
    "Next.js", "NestJS", "Express", "Prisma", "PostgreSQL",
    "MySQL", "TypeScript", "Tailwind", "Redis", "Node.js",
    "React", "Git", "Docker", "REST API", "Linux",
  ];

  const positions = useMemo(() => {
    return techs.map((_, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / techs.length);
      const theta = Math.PI * 2 * i * 0.618033988749895;
      const radius = 2.4;
      return {
        pos: [radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)] as [number, number, number],
        tech: techs[i],
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={group}>
      {positions.map((item, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={item.pos}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[item.pos[0] * 1.2, item.pos[1] * 1.2, item.pos[2] * 1.2]}
            fontSize={0.16}
            color="#A0A0A0"
            font="/fonts/inter.woff"
            anchorX="center"
            anchorY="middle"
          >
            {item.tech}
          </Text>
        </Float>
      ))}
      <mesh>
        <sphereGeometry args={[2.35, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} wireframe />
      </mesh>
    </group>
  );
}

export default function TechSphere() {
  return (
    <div className="w-full h-[500px] sm:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <TechSphereContent />
        </Suspense>
      </Canvas>
    </div>
  );
}