import {
  Engine,
  Mesh,
  PhysicsImpostorParameters,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { colorFromPosition } from '../assets/colors';
import { addEnvironmentTexture } from '../assets/environment';
import {
  Directional,
  Hemispheric,
  Point,
  Spot,
  angleTo,
  directionTo,
  exponentTo,
  intensityTo,
} from '../assets/lights';
import {
  Box,
  Ground,
  Sphere,
  doMaterialTo,
  meshModifiers as mesh,
} from '../assets/meshes';
import { addPhysics } from '../assets/physics';
import { doPlayerController } from '../inputs/controls';
import { ENVIRONMENT_TEXTURE_PATH, GRAVITY_VECTOR } from '../logic//game';
import { Camera, cameraModifiers as cam } from '../misc/camera';
import { enablePointerLock } from './scene';

const GROUND_DIMENSIONS = new Vector3(50, 50, 50);
const GROUND_TEXTURE = { name: 'stone', uvScale: 4 };
const BOX_PHYSICS: PhysicsImpostorParameters = {
  mass: 1,
  restitution: 0,
};
const GROUND_PHYSICS: PhysicsImpostorParameters = {
  mass: 0,
  restitution: 0,
};
const WALLS = [
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

const generateColumnPositions = () => {
  const columns = [];
  for (let i = -19; i < 20; i++) {
    for (let j = -19; j < 20; j++) {
      if (i % 5 === 0 && j % 5 === 0 && !(i === 0 && j === 0)) {
        columns.push({
          position: { x: i, y: 2, z: j },
          dimensions: new Vector3(2, 4, 2),
        });
      }
    }
  }
  return columns;
};

const COLUMNS = generateColumnPositions();

export const loadLevel = async (scene: Scene, engine: Engine) => {
  await addPhysics(scene, GRAVITY_VECTOR);
  addEnvironmentTexture(scene, ENVIRONMENT_TEXTURE_PATH);

  Hemispheric('hemispheric', scene)
    .set(mesh.positionTo(new Vector3(0, 12, 0)))
    .set(intensityTo(0.5));

  Directional('direction', scene)
    .set(directionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(5));

  Point('point', scene)
    .set(mesh.positionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(5));

  Spot('spot', scene)
    .set(mesh.positionTo(new Vector3(0, 10, 0)))
    .set(directionTo(new Vector3(0, -1, 0)))
    .set(intensityTo(1))
    .set(angleTo(Math.PI / 6))
    .fold(exponentTo(10));

  const materialTo = doMaterialTo(scene);
  Ground('ground', scene)
    .set(mesh.sizeTo(GROUND_DIMENSIONS))
    .set(materialTo(GROUND_TEXTURE))
    .set(mesh.boxPhysicsTo(GROUND_PHYSICS));

  WALLS.map((wall, index) =>
    Box(`wall-${index}`, scene)
      .set(mesh.positionTo(wall.position))
      .set(mesh.sizeTo(wall.dimensions))
      .set(mesh.boxPhysicsTo({ mass: 0 }))
  );
  COLUMNS.map((column) => {
    const { x, y, z } = column.position;
    Box(`column-${x}-${y}`, scene)
      .set(mesh.sizeTo(column.dimensions))
      .set(mesh.positionTo(new Vector3(x, y, z)))
      .set(materialTo(colorFromPosition(x, z)))
      .fold(mesh.boxPhysicsTo(BOX_PHYSICS));
  });

  const head = Camera(scene, new Vector3(0, 2, 0))
    .set(cam.targetTo(new Vector3(0, 2, 1)))
    .fold(cam.minZto(0.01));
  const body: Mesh = Sphere(`body`, scene)
    .set(mesh.sizeTo(new Vector3(2, 2, 2)))
    .set(mesh.positionTo(new Vector3(0, 1, 0)))
    .set(mesh.visibleTo(false))
    .fold(mesh.spherePhysicsTo({ mass: 1, friction: 0 }));
  head.parent = body;

  const playerController = doPlayerController(body, head);
  scene.onPointerMove = playerController.mouse.handleMove;
  scene.onKeyboardObservable.add(playerController.keyboard.registerInputs);
  scene.registerBeforeRender(() => playerController.keyboard.move());
  enablePointerLock(scene, engine, () => {});
};
