import {
  DirectionalLight,
  Engine,
  FreeCamera,
  Mesh,
  PhysicsImpostorParameters,
  Scene,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import { colorFromPosition } from '../assets/colors';
import { addEnvironmentTexture } from '../assets/environment';
import { Directional, Hemispheric, Point, Spot } from '../assets/lights';
import { addMaterial } from '../assets/materials';
import {
  Box,
  Ground,
  MeshAestheticOptions,
  checkCollisionsTo,
  physicsTo,
  positionTo,
  sizeTo,
} from '../assets/meshes';
import { addPhysics } from '../assets/physics';
import { addPlayer } from '../assets/player';
import { ENVIRONMENT_TEXTURE_PATH, GRAVITY_VECTOR } from '../logic//game';
import { enablePointerLock } from './scene';

const GROUND_DIMENSIONS = new Vector3(50, 50, 50);
const GROUND_TEXTURE = { name: 'stone', uvScale: 4 };

const BOX_PHYSICS: PhysicsImpostorParameters = {
  mass: 1,
  restitution: 0.5,
};
const GROUND_PHYSICS: PhysicsImpostorParameters = {
  mass: 0,
  restitution: 0.5,
};
const doMaterialTo =
  (scene: Scene) => (material: MeshAestheticOptions) => (mesh: Mesh) => {
    addMaterial(material, scene, mesh);
    return mesh;
  };

export const loadLevel = async (scene: Scene, engine: Engine) => {
  const materialTo = doMaterialTo(scene);

  await addPhysics(scene, GRAVITY_VECTOR);
  addEnvironmentTexture(scene, ENVIRONMENT_TEXTURE_PATH);

  Hemispheric('hemispheric', scene)
    .set(positionTo(new Vector3(0, 12, 0)))
    .set(intensityTo(0.5));

  Directional('direction', scene)
    .set(directionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(5));

  Point('point', scene)
    .set(positionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(5));

  Spot('spot', scene)
    .set(positionTo(new Vector3(0, 10, 0)))
    .set(directionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(1))
    .set(angleTo(Math.PI / 6))
    .fold(exponentTo(10));

  Ground('ground', scene)
    .set(sizeTo(GROUND_DIMENSIONS))
    .set(materialTo(GROUND_TEXTURE))
    .set(checkCollisionsTo(true))
    .set(physicsTo(GROUND_PHYSICS));

  const walls = [
    {
      position: new Vector3(0, 3, -25.5),
      dimensions: new Vector3(50, 6, 1),
    },
    {
      position: new Vector3(0, 3, 25.5),
      dimensions: new Vector3(50, 6, 1),
    },
    {
      position: new Vector3(-25.5, 3, 0),
      dimensions: new Vector3(1, 6, 50),
    },
    {
      position: new Vector3(25.5, 3, 0),
      dimensions: new Vector3(1, 6, 50),
    },
  ];

  walls.map((wall, index) =>
    Box(`wall-${index}`, scene)
      .set(positionTo(wall.position))
      .set(sizeTo(wall.dimensions))
      .set(checkCollisionsTo(true))
  );

  const boxesPositions = [];
  for (let i = -19; i < 20; i++) {
    for (let j = -19; j < 20; j++) {
      if (i % 5 === 0 && j % 5 === 0) {
        boxesPositions.push({ x: i, y: j });
      }
    }
  }

  boxesPositions.map((position) => {
    const { x, y } = position;
    return Box(`box-${x}-${y}`, scene)
      .set(sizeTo(new Vector3(2, 4, 2)))
      .set(positionTo(new Vector3(x, 2, y)))
      .set(materialTo(colorFromPosition(x, y)))
      .set(checkCollisionsTo(true))
      .set(physicsTo(BOX_PHYSICS));
  });

  addPlayer(scene, new Vector3(0, 4, -18));

  enablePointerLock(scene, engine, console.log);
};

export const directionTo =
  (direction: Vector3) => (light: SpotLight | DirectionalLight) => {
    light.direction = direction;
    return light;
  };
export const intensityTo =
  (intensity: number) => (light: SpotLight | DirectionalLight) => {
    light.intensity = intensity;
    return light;
  };
export const angleTo = (angle: number) => (light: SpotLight) => {
  light.angle = angle;
  return light;
};
export const exponentTo = (exponent: number) => (light: SpotLight) => {
  light.exponent = exponent;
  return light;
};
export const parentTo = (parent: Mesh | FreeCamera) => (mesh: Mesh) => {
  mesh.parent = parent;
  return mesh;
};
