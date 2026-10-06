import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Mesh, PointLight } from "three";

import type { LocalizedString } from "@/data/projects";

interface Certificate {
  id: string;
  title: string | LocalizedString;
  issuer?: string | LocalizedString;
  date?: string;
}

interface TrophyCaveSceneProps {
  position: [number, number, number];
  certificates: Certificate[];
}

function Crystal({
  cert,
  index,
  total,
}: {
  cert: Certificate;
  index: number;
  total: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<PointLight>(null);

  const { pos, rotSpeed, glowPulse } = useMemo(() => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const spreadX = (col - 1) * 3.5;
    const spreadY = 2.0 + Math.sin(index * 1.2) * 0.8;
    const spreadZ = -4 - row * 3.5;

    return {
      pos: [spreadX, spreadY, spreadZ] as [number, number, number],
      rotSpeed: 0.3 + Math.random() * 0.7,
      glowPulse: 0.5 + Math.random() * 0.5,
    };
  }, [index]);

  const hue = useMemo(
    () => (index * 0.15 + 0.55) % 1,
    [index]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 * rotSpeed;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5 + index) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.intensity =
        0.6 + Math.sin(clock.elapsedTime * 2 + index) * glowPulse * 0.4;
    }
  });

  const titleStr =
    typeof cert.title === "string"
      ? cert.title
      : (cert.title as { id?: string })?.id ?? JSON.stringify(cert.title);

  return (
    <group position={pos}>
      {/* Crystal shape (octahedron) */}
      <mesh ref={meshRef} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={`hsl(${hue * 360}, 70%, 60%)`}
          emissive={`hsl(${hue * 360}, 70%, 30%)`}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={`hsl(${hue * 360}, 90%, 80%)`}
          emissive={`hsl(${hue * 360}, 90%, 50%)`}
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight
        ref={glowRef}
        intensity={0.6}
        color={`hsl(${hue * 360}, 80%, 50%)`}
        distance={4}
        decay={2}
      />

      {/* Text label */}
      <Billboard position={[0, 0.85, 0]} follow={true}>
        <Text
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
          maxWidth={3}
        >
          {titleStr.length > 28 ? titleStr.slice(0, 27) + "..." : titleStr}
        </Text>
        {cert.issuer && (
          <Text
            fontSize={0.1}
            color="#aaaaaa"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.2, 0]}
          >
            {typeof cert.issuer === "string"
              ? cert.issuer
              : (cert.issuer as { id?: string })?.id ?? ""}
          </Text>
        )}
      </Billboard>
    </group>
  );
}

function SparkleParticle({
  index,
}: {
  index: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<{ opacity: number } | null>(null);

  const initialPos = useMemo(() => {
    return [
      (Math.random() - 0.5) * 10,
      Math.random() * 5,
      -2 - Math.random() * 8,
    ] as [number, number, number];
  }, []);

  const speed = useMemo(() => 0.3 + Math.random() * 0.8, []);
  const hue = useMemo(() => Math.random() * 0.2 + 0.1, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime + index * 0.5;
      meshRef.current.position.y =
        initialPos[1] + Math.sin(t * speed) * 2;
      meshRef.current.position.x =
        initialPos[0] + Math.cos(t * speed * 1.3) * 1.5;
      const scale = 0.5 + Math.sin(t * 3 + index) * 0.5;
      meshRef.current.scale.setScalar(Math.max(0.2, scale));
    }
    if (materialRef.current) {
      const t = clock.elapsedTime + index * 0.5;
      materialRef.current.opacity =
        0.3 + Math.sin(t * 2 + index) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={initialPos}>
      <sphereGeometry args={[0.04, 4, 4]} />
      <meshStandardMaterial
        ref={materialRef as never}
        color={`hsl(${hue * 360}, 90%, 70%)`}
        emissive={`hsl(${hue * 360}, 80%, 40%)`}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function TrophyCaveScene({
  position,
  certificates,
}: TrophyCaveSceneProps) {
  const sparkles = useMemo(
    () => Array.from({ length: 40 }, (_, i) => i),
    []
  );

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="trimesh">
        {/* Cave floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.03, -3]}>
          <planeGeometry args={[12, 12]} />
          <meshToonMaterial color="#37474f" />
        </mesh>

        {/* Back wall */}
        <mesh position={[0, 2.5, -8.5]} castShadow receiveShadow>
          <boxGeometry args={[12, 5, 1]} />
          <meshToonMaterial color="#455a64" />
        </mesh>

        {/* Left wall */}
        <mesh position={[-6, 2.5, -3]} castShadow receiveShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[12, 5, 1]} />
          <meshToonMaterial color="#455a64" />
        </mesh>

        {/* Right wall */}
        <mesh position={[6, 2.5, -3]} castShadow receiveShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[12, 5, 1]} />
          <meshToonMaterial color="#455a64" />
        </mesh>

        {/* Ceiling */}
        <mesh position={[0, 5, -3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <planeGeometry args={[12, 12]} />
          <meshToonMaterial color="#263238" />
        </mesh>

        {/* Arch entrance - left pillar */}
        <mesh position={[-2, 1.5, 3]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
          <meshToonMaterial color="#546e7a" />
        </mesh>

        {/* Arch entrance - right pillar */}
        <mesh position={[2, 1.5, 3]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
          <meshToonMaterial color="#546e7a" />
        </mesh>

        {/* Arch entrance - top beam */}
        <mesh position={[0, 3.2, 3]} castShadow>
          <boxGeometry args={[2.6, 0.3, 0.4]} />
          <meshToonMaterial color="#546e7a" />
        </mesh>

        {/* Arch entrance - curved top */}
        <mesh position={[0, 3.5, 3]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.4, 8, 1, false, 1, Math.PI]} />
          <meshToonMaterial color="#546e7a" />
        </mesh>

        {/* Rocky decorations */}
        {[[-3, 0, 0], [3, 0, 0], [-5, 0, -5], [5, 0, -5], [0, 0, -7]].map(
          (pos, i) => (
            <mesh key={`deco-${i}`} position={pos as [number, number, number]} castShadow>
              <icosahedronGeometry args={[0.6 + Math.random() * 0.6, 0]} />
              <meshToonMaterial color="#546e7a" />
            </mesh>
          )
        )}
      </RigidBody>

      {/* Crystals / floating certificates */}
      {certificates.map((cert, i) => (
        <Crystal
          key={`cert-${cert.id}`}
          cert={cert}
          index={i}
          total={certificates.length}
        />
      ))}

      {/* Sparkles / particles */}
      {sparkles.map((i) => (
        <SparkleParticle key={`spark-${i}`} index={i} />
      ))}

      {/* Ambient cave lighting */}
      <pointLight
        position={[0, 3, -3]}
        intensity={0.4}
        color="#4a6fa5"
        distance={15}
      />
      <pointLight
        position={[0, 1, 0]}
        intensity={0.3}
        color="#ffd54f"
        distance={8}
      />
    </group>
  );
}