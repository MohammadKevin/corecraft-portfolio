import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { Vector3, MathUtils } from "three";

const MOVE_SPEED = 5;
const SPRINT_SPEED = 9;
const JUMP_FORCE = 8;
const CAMERA_DISTANCE = 6;
const CAMERA_HEIGHT = 4;
const LERP_FACTOR = 0.08;

export default function Player() {
  const bodyRef = useRef<RapierRigidBody>(null);
  const cameraTarget = useRef(new Vector3(0, 1.5, 0));
  const cameraPosition = useRef(new Vector3(0, 3, 6));
  const [, getKeys] = useKeyboardControls();
  const { camera } = useThree();
  const grounded = useRef(true);
  const isOnGround = useRef(true);

  useEffect(() => {
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 1.5, 0);
  }, [camera]);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    const keys = getKeys();
    const { forward, backward, leftward, rightward, jump, sprint } = keys;

    const speed = sprint ? SPRINT_SPEED : MOVE_SPEED;
    const linvel = body.linvel();
    const currentVel = new Vector3(linvel.x, linvel.y, linvel.z);
    const pos = body.translation();

    const forwardDir = new Vector3(0, 0, -1).normalize();
    const rightDir = new Vector3(1, 0, 0).normalize();

    const moveDir = new Vector3();

    if (forward) moveDir.add(forwardDir);
    if (backward) moveDir.sub(forwardDir);
    if (leftward) moveDir.sub(rightDir);
    if (rightward) moveDir.add(rightDir);

    if (moveDir.length() > 0) {
      moveDir.normalize();
    }

    const targetVelX = moveDir.x * speed;
    const targetVelZ = moveDir.z * speed;

    const newVelX = MathUtils.lerp(currentVel.x, targetVelX, 0.2);
    const newVelZ = MathUtils.lerp(currentVel.z, targetVelZ, 0.2);

    body.setLinvel({ x: newVelX, y: currentVel.y, z: newVelZ }, true);

    if (jump && grounded.current) {
      body.setLinvel({ x: newVelX, y: JUMP_FORCE, z: newVelZ }, true);
      grounded.current = false;
    }

    // Simple ground check via Y velocity near zero
    if (Math.abs(currentVel.y) < 0.1 && !grounded.current) {
      grounded.current = true;
    }

    const playerPos = new Vector3(pos.x, pos.y, pos.z);

    // Camera target: behind player
    const behind = new Vector3(0, 0, 1).normalize();
    const desiredCameraPos = new Vector3(
      playerPos.x + behind.x * CAMERA_DISTANCE,
      playerPos.y + CAMERA_HEIGHT,
      playerPos.z + behind.z * CAMERA_DISTANCE
    );

    camera.position.lerp(desiredCameraPos, LERP_FACTOR);

    const lookTarget = new Vector3(
      playerPos.x,
      playerPos.y + 1.5,
      playerPos.z
    );
    camera.lookAt(lookTarget);

    cameraTarget.current.copy(lookTarget);
    cameraPosition.current.copy(desiredCameraPos);
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      type="dynamic"
      position={[0, 3, 0]}
      enabledRotations={[false, false, false]}
      mass={1}
      friction={0}
      linearDamping={0.5}
      onCollisionEnter={() => {
        grounded.current = true;
      }}
    >
      <CapsuleCollider args={[0.8, 0.5]} position={[0, 0.8, 0]} />

      {/* Body */}
      <mesh castShadow position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.5, 0.8, 8, 16]} />
        <meshToonMaterial color="#4a90d9" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshToonMaterial color="#f5d0a9" />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.12, 1.78, 0.28]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.12, 1.78, 0.28]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </RigidBody>
  );
}