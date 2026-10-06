import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Group } from "three";

import type { SkillItem } from "@/data/skills";

interface SkillTreesProps {
  position: [number, number, number];
  skills: SkillItem[];
  categoryTitle?: string;
}

const TRUNK_HEIGHTS = [2.2, 2.8, 2.0, 1.9, 2.5, 2.3];
const CANOPY_COLORS = ["#2e7d32", "#388e3c", "#43a047", "#1b5e20", "#66bb6a"];

function SkillOrb({
  skill,
  index,
  total,
  centerPos,
}: {
  skill: SkillItem;
  index: number;
  total: number;
  centerPos: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const phase = index * 0.8;
  const amplitude = 0.15 + index * 0.03;

  const baseX =
    centerPos[0] + Math.cos((index / total) * Math.PI * 2) * 2.2;
  const baseY = centerPos[1] + 2.5 + Math.sin(index * 1.7) * 0.6;
  const baseZ =
    centerPos[2] + Math.sin((index / total) * Math.PI * 2) * 2.2;

  const hue = useMemo(() => Math.random() * 0.3 + 0.08, [skill.name]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        baseY + Math.sin(clock.elapsedTime * 1.5 + phase) * amplitude;
    }
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, baseZ]}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={`hsl(${hue * 360}, 80%, 60%)`}
            emissive={`hsl(${hue * 360}, 80%, 40%)`}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
        <Text
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          position={[0, -0.35, 0]}
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {skill.name.length > 12
            ? skill.name.slice(0, 11) + "..."
            : skill.name}
        </Text>
      </Billboard>
    </group>
  );
}

export default function SkillTrees({
  position,
  skills,
  categoryTitle,
}: SkillTreesProps) {
  const trees = useMemo(() => {
    const treeCount = Math.max(4, Math.ceil(skills.length / 2));
    return Array.from({ length: treeCount }, (_, i) => {
      const angle = (i / treeCount) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;
      return {
        pos: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        trunkH: TRUNK_HEIGHTS[i % TRUNK_HEIGHTS.length],
        canopyColor: CANOPY_COLORS[i % CANOPY_COLORS.length],
      };
    });
  }, [skills.length]);

  return (
    <group position={position}>
      {/* Small ground patch */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.03, 0]}>
          <circleGeometry args={[6, 16]} />
          <meshToonMaterial color="#3e6918" />
        </mesh>
      </RigidBody>

      {/* Trees */}
      {trees.map((tree, i) => (
        <RigidBody
          key={`tree-${i}`}
          type="fixed"
          position={[tree.pos[0], tree.pos[1], tree.pos[2]]}
          colliders="trimesh"
        >
          {/* Trunk */}
          <mesh castShadow position={[0, tree.trunkH / 2, 0]}>
            <cylinderGeometry args={[0.12, 0.2, tree.trunkH, 8]} />
            <meshToonMaterial color="#5d4037" />
          </mesh>

          {/* Canopy layers */}
          <mesh castShadow position={[0, tree.trunkH + 0.3, 0]}>
            <sphereGeometry args={[0.6, 8, 6]} />
            <meshToonMaterial color={tree.canopyColor} />
          </mesh>
          <mesh castShadow position={[0.4, tree.trunkH, 0]}>
            <sphereGeometry args={[0.45, 8, 6]} />
            <meshToonMaterial color={tree.canopyColor} />
          </mesh>
          <mesh castShadow position={[-0.4, tree.trunkH, 0]}>
            <sphereGeometry args={[0.45, 8, 6]} />
            <meshToonMaterial color={tree.canopyColor} />
          </mesh>
        </RigidBody>
      ))}

      {/* Skill orbs */}
      {skills.map((skill, i) => {
        const treeIdx = i % trees.length;
        return (
          <SkillOrb
            key={`orb-${i}`}
            skill={skill}
            index={i}
            total={skills.length}
            centerPos={trees[treeIdx].pos}
          />
        );
      })}

      {/* Category title billboard */}
      {categoryTitle && (
        <Billboard position={[0, 4.5, 0]}>
          <Text
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#000000"
          >
            {categoryTitle}
          </Text>
        </Billboard>
      )}
    </group>
  );
}