import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";

const ISLAND_RADIUS = 30;
const WATER_SIZE = 80;
const PALM_COLORS = ["#6b8e23", "#556b2f", "#7c9f2e", "#5a7a1a", "#6f9e30"];

function PalmTree({ position }: { position: [number, number, number] }) {
  const trunkColor = useMemo(
    () => `#${Math.floor(Math.random() * 0x555555 + 0x8b6914).toString(16)}`,
    []
  );
  const leafColor = useMemo(
    () => PALM_COLORS[Math.floor(Math.random() * PALM_COLORS.length)],
    []
  );

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 2.4, 8]} />
          <meshToonMaterial color={trunkColor} />
        </mesh>
        <mesh castShadow position={[0, 2.6, 0]}>
          <sphereGeometry args={[0.7, 6, 4]} />
          <meshToonMaterial color={leafColor} />
        </mesh>
        <mesh castShadow position={[0.5, 2.9, 0]}>
          <sphereGeometry args={[0.5, 6, 4]} />
          <meshToonMaterial color={leafColor} />
        </mesh>
        <mesh castShadow position={[-0.5, 2.9, 0]}>
          <sphereGeometry args={[0.5, 6, 4]} />
          <meshToonMaterial color={leafColor} />
        </mesh>
        <mesh castShadow position={[0, 3.1, 0.5]}>
          <sphereGeometry args={[0.45, 6, 4]} />
          <meshToonMaterial color={leafColor} />
        </mesh>
        <mesh castShadow position={[0, 3.1, -0.5]}>
          <sphereGeometry args={[0.45, 6, 4]} />
          <meshToonMaterial color={leafColor} />
        </mesh>
      </RigidBody>
    </group>
  );
}

function Hill({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <RigidBody type="fixed" position={position} colliders="trimesh">
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[scale[0], scale[0] * 1.3, scale[1], 12]} />
        <meshToonMaterial color="#4a8c3f" />
      </mesh>
    </RigidBody>
  );
}

function Rock({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <RigidBody type="fixed" position={position} colliders="trimesh">
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[scale, 0]} />
        <meshToonMaterial color="#808080" />
      </mesh>
    </RigidBody>
  );
}

export default function Island() {
  const waterRef = useRef<{
    geometry?: {
      attributes?: {
        position?: { array?: Float32Array; needsUpdate?: boolean };
      };
    };
  }>(null);
  const waterTime = useRef(0);

  const palmPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = ISLAND_RADIUS * 0.7 + Math.random() * ISLAND_RADIUS * 0.25;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, 0.05, z]);
    }
    return positions;
  }, []);

  const hillPositions = useMemo(() => {
    const hills: {
      position: [number, number, number];
      scale: [number, number, number];
    }[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.4;
      const radius = ISLAND_RADIUS * 0.4 + Math.random() * ISLAND_RADIUS * 0.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      hills.push({
        position: [x, -0.1, z],
        scale: [3 + Math.random() * 3, 1 + Math.random() * 2, 3 + Math.random() * 3],
      });
    }
    return hills;
  }, []);

  const rockPositions = useMemo(() => {
    const rocks: { position: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = ISLAND_RADIUS * 0.55 + Math.random() * ISLAND_RADIUS * 0.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      rocks.push({
        position: [x, 0, z],
        scale: 0.3 + Math.random() * 0.7,
      });
    }
    return rocks;
  }, []);

  useFrame((_, delta) => {
    waterTime.current += delta;
    if (waterRef.current) {
      const posAttr = (
        waterRef.current as unknown as {
          geometry: {
            attributes: { position: { array: Float32Array; needsUpdate: boolean } };
          };
        }
      ).geometry?.attributes?.position;
      if (posAttr) {
        const arr = posAttr.array;
        for (let i = 0; i < arr.length; i += 3) {
          arr[i + 2] =
            Math.sin(arr[i] * 0.5 + waterTime.current) * 0.3 +
            Math.cos(arr[i + 1] * 0.3 + waterTime.current * 1.3) * 0.2;
        }
        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Island ground */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.05, 0]}>
          <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS, 0.1, 32]} />
          <meshToonMaterial color="#4caf50" />
        </mesh>
      </RigidBody>

      {/* Sand beach ring */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.02, 0]}>
          <cylinderGeometry args={[ISLAND_RADIUS + 1.5, ISLAND_RADIUS - 0.5, 0.05, 32]} />
          <meshToonMaterial color="#f4d03f" />
        </mesh>
      </RigidBody>

      {/* Hills */}
      {hillPositions.map((hill, i) => (
        <Hill key={`hill-${i}`} position={hill.position} scale={hill.scale} />
      ))}

      {/* Rocks */}
      {rockPositions.map((rock, i) => (
        <Rock key={`rock-${i}`} position={rock.position} scale={rock.scale} />
      ))}

      {/* Palm trees */}
      {palmPositions.map((pos, i) => (
        <PalmTree key={`palm-${i}`} position={pos} />
      ))}

      {/* Spawn area - flat sand patch */}
      <RigidBody type="fixed" position={[0, -0.01, 0]} colliders="trimesh">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[4, 16]} />
          <meshToonMaterial color="#e8c86a" />
        </mesh>
      </RigidBody>

      {/* Water plane */}
      <mesh
        ref={waterRef as never}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.15, 0]}
      >
        <planeGeometry args={[WATER_SIZE, WATER_SIZE, 50, 50]} />
        <meshStandardMaterial
          color="#2196f3"
          transparent
          opacity={0.6}
          side={2}
        />
      </mesh>
    </group>
  );
}