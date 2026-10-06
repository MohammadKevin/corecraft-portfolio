import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MathUtils } from "three";

interface ProjectBuildingProps {
  position: [number, number, number];
  color: string;
  title: string;
  projectData: {
    id: string;
    title: string;
    category: string;
    tech: string[];
  };
  onInteract?: (id: string) => void;
  playerPos?: React.MutableRefObject<{ x: number; y: number; z: number }>;
}

const INTERACT_DISTANCE = 4;

export default function ProjectBuilding({
  position,
  color,
  title,
  projectData,
  onInteract,
  playerPos,
}: ProjectBuildingProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const orbRef = useRef<{
    position: { set: (x: number, y: number, z: number) => void };
  }>(null);
  const lanternRef = useRef<{
    intensity: number;
  } | null>(null);
  const promptRef = useRef<{
    timer: number;
  }>({ timer: 0 });

  const roofColor = useMemo(() => {
    // Darken the base color for roof
    if (color === "#e74c3c") return "#c0392b";
    if (color === "#3498db") return "#2980b9";
    if (color === "#2ecc71") return "#27ae60";
    if (color === "#f39c12") return "#e67e22";
    if (color === "#9b59b6") return "#8e44ad";
    if (color === "#1abc9c") return "#16a085";
    return "#7f8c8d";
  }, [color]);

  useFrame((_, delta) => {
    // Animate orb
    if (orbRef.current) {
      const t = Date.now() * 0.001;
      orbRef.current.position.set(
        1.2,
        1.0 + Math.sin(t * 2) * 0.15,
        0.3
      );
    }

    // Check proximity
    if (playerPos?.current && onInteract) {
      const dx = playerPos.current.x - position[0];
      const dy = playerPos.current.y - position[1];
      const dz = playerPos.current.z - position[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < INTERACT_DISTANCE) {
        if (!showPrompt) setShowPrompt(true);
      } else {
        if (showPrompt) setShowPrompt(false);
      }
    }
  });

  const handleClick = () => {
    if (onInteract && showPrompt) {
      onInteract(projectData.id);
    }
  };

  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      {/* Main building body */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 1.6]} />
        <meshToonMaterial color={color} />
      </mesh>

      {/* Roof - cone/pyramid */}
      <mesh castShadow position={[0, 2.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.5, 1.2, 4]} />
        <meshToonMaterial color={roofColor} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.6, 0.81]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshToonMaterial color="#3e2723" side={2} />
      </mesh>

      {/* Small window */}
      <mesh position={[0.6, 1.2, 0.81]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshToonMaterial color="#fff3e0" side={2} />
      </mesh>
      <mesh position={[-0.6, 1.2, 0.81]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshToonMaterial color="#fff3e0" side={2} />
      </mesh>

      {/* Lantern/glowing orb */}
      <mesh
        ref={orbRef as never}
        position={[1.2, 1.0, 0.3]}
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#ffd54f"
          emissive="#ffa000"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[1.2, 1.0, 0.3]}
        intensity={0.8}
        color="#ffd54f"
        distance={3}
      />

      {/* Floating title billboard */}
      <Billboard position={[0, 3.2, 0]}>
        <Text
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {title.length > 16 ? title.slice(0, 16) + "..." : title}
        </Text>
        <Text
          fontSize={0.18}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.4, 0]}
        >
          {projectData.category}
        </Text>
      </Billboard>

      {/* "Press E" prompt */}
      {showPrompt && (
        <Billboard position={[0, 4.0, 0]}>
          <Text
            fontSize={0.22}
            color="#ffeb3b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#000000"
          >
            Press E to view
          </Text>
        </Billboard>
      )}

      {/* Interactive hit area (invisible clickable box) */}
      <mesh
        position={[0, 1.5, 0]}
        onClick={handleClick}
        visible={false}
      >
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </RigidBody>
  );
}