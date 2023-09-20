import {
  Color3,
  Engine,
  GroundMesh,
  Mesh,
  PhysicsImpostorParameters,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { doCreateAnimationTriggerFor } from '../assets/animations';
import { addEnvironmentTexture } from '../assets/environment';
import {
  addDirectionalLight,
  addHemisphericLight,
  addPointLight,
  addSpotLight,
} from '../assets/lights';
import { addModel } from '../assets/models';
import { addPhysics } from '../assets/physics';
import { doPlayerController } from '../inputs/controls';
import {
  addInterpolateValueActionTo,
  addMeshActionTo,
  addSceneActionTo,
} from '../logic/actions';
import { registerCollisionFrom } from '../logic/collisions';
import {
  ENVIRONMENT_TEXTURE_PATH,
  GRAVITY_VECTOR,
  MODELS_FILE2,
} from '../logic/game';
import {
  doOnFirstIntersectionBetween,
  hideIntersected,
} from '../logic/intersections';
import { hit } from '../logic/raycasting';
import { doGiveColliderRedTexture } from '../logic/reactions';
import { enablePointerLock } from '../logic/scene';
import { Camera } from '../assets/camera';
import {
  Box,
  Ground,
  Sphere,
  doMaterialTo,
  meshModifiers,
} from '../assets/meshes';

const GROUND_TEXTURE = { name: 'stone', uvScale: 4 };
const GROUND_PHYSICS: PhysicsImpostorParameters = {
  mass: 0,
  restitution: 0,
};
export const loadDemo = async (scene: Scene, engine: Engine) => {
  await addPhysics(scene, GRAVITY_VECTOR);
  addEnvironmentTexture(scene, ENVIRONMENT_TEXTURE_PATH);
  const materialTo = doMaterialTo(scene);

  const ground = Ground('ground', scene)
    .set(meshModifiers.sizeTo(new Vector3(40, 0, 40)))
    .set(materialTo(GROUND_TEXTURE))
    .fold(meshModifiers.boxPhysicsTo(GROUND_PHYSICS));

  const actionBox = Box('actionBox', scene)
    .set(meshModifiers.positionTo(new Vector3(0, 4, 15)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .set(materialTo({ name: 'metal', uvScale: 3 }))
    .fold(meshModifiers.boxPhysicsTo({ mass: 0 }));
  const collateralBox = Box('collateralBox', scene)
    .set(meshModifiers.positionTo(new Vector3(6, 4, 15)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .fold(materialTo({ name: 'metal', uvScale: 3 }));

  actionBox.checkCollisions = true;

  const SHRUNK_BOX_SCALE = new Vector3(0.5, 0.5, 0.5);

  addMeshActionTo(scene)
    .when('OnCenterPickTrigger')
    .at(actionBox)
    .set('scaling')
    .for([actionBox, collateralBox])
    .to(SHRUNK_BOX_SCALE);

  const interpolateActionBox = Box('interpolateActionBox', scene)
    .set(meshModifiers.positionTo(new Vector3(-6, 4, 15)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .fold(materialTo({ name: new Color3(0, 0, 1), uvScale: 3 }))
    .fold(meshModifiers.boxPhysicsTo({ mass: 0 }));

  addInterpolateValueActionTo(scene)
    .when('OnRightPickTrigger')
    .at(interpolateActionBox)
    .set('rotation')
    .for(interpolateActionBox)
    .to(new Vector3(Math.PI / 4, Math.PI / 4, Math.PI / 4))
    .within(3000);

  const head = Camera(scene, new Vector3(0, 2, 0)).fold();

  const body = Box('body', scene)
    .set(meshModifiers.positionTo(new Vector3(0, 1, -18)))
    .set(meshModifiers.sizeTo(new Vector3(1, 2, 1)))
    .set(meshModifiers.rotationTo(new Vector3(0, 0, 0)))
    .fold(meshModifiers.boxPhysicsTo({ mass: 1, friction: 0 }));

  head.parent = body;
  const {
    mouse: playerMouseController,
    keyboard: playerKeyboardController,
    player,
  } = doPlayerController(body, head);

  scene.onPointerMove = playerMouseController.handleMove;
  scene.onKeyboardObservable.add(playerKeyboardController.registerInputs);
  scene.registerBeforeRender(() => player.move());

  addHemisphericLight(scene, new Vector3(0, 12, 0), 5);
  addDirectionalLight(scene, new Vector3(0, -1, 0), 5);
  addPointLight(scene, new Vector3(0, -1, 0), 5);
  addSpotLight(
    scene,
    new Vector3(0, 3, -3),
    new Vector3(0, -1, 1),
    5,
    Math.PI / 2,
    20
  );

  addSceneActionTo(scene)
    .when('OnEveryFrameTrigger')
    .increment('rotation.z')
    .for(collateralBox)
    .by(0.02);

  const collidingBox = Box('collidingBox', scene)
    .set(meshModifiers.positionTo(new Vector3(-12, 12, 15)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .set(materialTo({ name: new Color3(0, 0, 1), uvScale: 4 }))
    .fold(meshModifiers.boxPhysicsTo({ mass: 1, restitution: 0.5 }));

  collidingBox.checkCollisions = true;

  registerCollisionFrom(collidingBox)
    .on(ground)
    .triggers(doGiveColliderRedTexture(scene));

  const winSphere = Sphere('winSphere', scene)
    .set(meshModifiers.positionTo(new Vector3(12, 20, 15)))
    .set(meshModifiers.sizeTo(new Vector3(2, 2, 2)))
    .set(materialTo({ name: 'stone', uvScale: 2 }))
    .fold(meshModifiers.spherePhysicsTo({ mass: 1, restitution: 1 }));

  const winBox = Box('winBox', scene)
    .set(meshModifiers.positionTo(new Vector3(12, 1, 15)))
    .set(meshModifiers.sizeTo(new Vector3(4, 2, 4)))
    .set(materialTo({ name: new Color3(0, 1, 0), uvScale: 4 }))
    .set(meshModifiers.visibityTo(0.7))
    .fold(meshModifiers.boxPhysicsTo({ mass: 1, friction: 0 }));

  winBox.visibility = 0.7;
  const onFirstIntersectionBetween = doOnFirstIntersectionBetween(scene);
  onFirstIntersectionBetween(winSphere).and(winBox).triggers(hideIntersected);

  const targetSphere = Sphere('targetSphere', scene)
    .set(meshModifiers.positionTo(new Vector3(0, 2.5, 10)))
    .set(meshModifiers.sizeTo(new Vector3(5, 5, 5)))
    .set(materialTo({ name: new Color3(0.5, 0.6, 0.1), uvScale: 4 }))
    .fold(meshModifiers.spherePhysicsTo({ mass: 0 }));

  const createAnimationTriggerFor = doCreateAnimationTriggerFor(scene);

  const targets = await addModel(scene, MODELS_FILE2);
  targets.shift();
  const target = Mesh.MergeMeshes(
    targets as Mesh[],
    true,
    true,
    undefined,
    false,
    true
  );
  if (target) {
    target.position.y = 3.5;
    target.position.z = -12;
    target.rotation.y = (Math.PI * 3) / 2;
    const targetRotation = createAnimationTriggerFor('rotation.x')
      .of(target)
      .as('rotation')
      .using('FLOAT', 'CYCLE')
      .frames([
        { frame: 0, value: 0 },
        { frame: 180, value: Math.PI / 2 },
      ]);
    const targetMovement = createAnimationTriggerFor('position')
      .of(target)
      .as('translation')
      .using('VECTOR3', 'CYCLE')
      .frames([
        { frame: 0, value: new Vector3(0, 3.75, -12) },
        { frame: 30, value: new Vector3(0.3, 4, -12) },
        { frame: 60, value: new Vector3(0.3, 3.5, -12) },
        { frame: 90, value: new Vector3(0, 3, -12) },
        { frame: 120, value: new Vector3(-0.3, 3.5, -12) },
        { frame: 150, value: new Vector3(-0.3, 3.75, -12) },
        { frame: 180, value: new Vector3(0, 3.75, -12) },
      ]);
    targetRotation();
    targetMovement();
  }
  enablePointerLock(scene, engine, hit(targetSphere.name, scene, head));
};
