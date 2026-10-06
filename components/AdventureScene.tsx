"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, Sky, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { projectsData } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { useLanguage } from "@/contexts/LanguageContext";
import Island from "@/components/three/Island";
import Player from "@/components/three/Player";
import ProjectBuilding from "@/components/three/ProjectBuilding";
import SkillTrees from "@/components/three/SkillTrees";
import TrophyCaveScene from "@/components/three/TrophyCaveScene";

const keyboardMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "back", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "jump", keys: ["Space"] },
  { name: "sprint", keys: ["ShiftLeft", "ShiftRight"] },
  { name: "interact", keys: ["KeyE"] },
];

const projectColors = [
  "#60A5FA", "#F59E0B", "#34D399", "#06B6D4", "#8B5CF6", "#EC4899", "#F97316",
];

const projectPositions: [number, number, number][] = [
  [12, 0, -8], [18, 0.5, -3], [14, 0, 3],
  [20, 0.5, 7], [16, 0, 12], [22, 0.2, -10], [8, 0, -14],
];

export default function AdventureScene() {
  const { lang } = useLanguage();
  const featured = projectsData.filter((p) => p.featured);

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [5, 8, 15], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.2 }}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[30, 30, 10]}
            intensity={1.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={80}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <hemisphereLight args={["#FFEBB3", "#87CEEB", 0.6]} />

          <Sky sunPosition={[100, 30, 20]} turbidity={8} rayleigh={2} />
          <Environment preset="sunset" />

          <Physics gravity={[0, -15, 0]}>
            <Player />
            <Island />

            {featured.map((p, i) => (
              <ProjectBuilding
                key={p.id}
                position={projectPositions[i % projectPositions.length]}
                color={projectColors[i % projectColors.length]}
                title={p.title}
                projectData={p}
              />
            ))}

            <SkillTrees
              position={[-15, 0, -10]}
              skills={allSkills.slice(0, 5)}
              categoryTitle={
                lang === "id" ? "Backend & Database" : "Backend & Database"
              }
            />
            <SkillTrees
              position={[-18, 0.5, 2]}
              skills={allSkills.slice(5, 8)}
              categoryTitle={
                lang === "id" ? "Frontend & UI" : "Frontend & UI"
              }
            />
            <SkillTrees
              position={[-12, 0, 8]}
              skills={allSkills.slice(8)}
              categoryTitle={
                lang === "id" ? "Tooling & DevOps" : "Tooling & DevOps"
              }
            />

            <TrophyCaveScene
              position={[-22, 0, -14]}
              certificates={certificatesData.slice(0, 6)}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}