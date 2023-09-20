import { Color3, Engine, Mesh, Scene, Vector3 } from '@babylonjs/core';
import { doCreateAnimationTriggerFor } from '../assets/animations';
import { addEnvironmentTexture } from '../assets/environment';
import {
  addDirectionalLight,
  addHemisphericLight,
  addPointLight,
  addSpotLight,
} from '../assets/lights';
import { addGround, doAddBox, doAddSphere } from '../assets/meshes';
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
import { Camera } from '../misc/camera';

export const loadDemo = async (scene: Scene, engine: Engine) => {
  await addPhysics(scene, GRAVITY_VECTOR);
  addEnvironmentTexture(scene, ENVIRONMENT_TEXTURE_PATH);
  const ground = addGround(
    scene,
    'ground',
    { size: 40 },
    {
      physics: { body: { mass: 0, restitution: 0 } },
      material: { name: 'stone', uvScale: 4 },
    }
  );

  const addBox = doAddBox(scene);
  const addSphere = doAddSphere(scene);
  const actionBox = addBox('actionBox')
    .positions({ x: 0, y: 4, z: 15 })
    .dimensions(4)
    .rotations()
    .material({ name: 'metal', uvScale: 3 })
    .physics({ body: { mass: 0 } });

  const collateralBox = addBox('collateralBox')
    .positions({ x: 6, y: 4, z: 15 })
    .dimensions(4)
    .rotations()
    .material({ name: 'metal', uvScale: 3 })
    .physics();

  actionBox.checkCollisions = true;

  const SHRUNK_BOX_SCALE = new Vector3(0.5, 0.5, 0.5);

  addMeshActionTo(scene)
    .when('OnCenterPickTrigger')
    .at(actionBox)
    .set('scaling')
    .for([actionBox, collateralBox])
    .to(SHRUNK_BOX_SCALE);

  const interpolateActionBox = addBox('interpolateActionBox')
    .positions({ x: -6, y: 4, z: 15 })
    .dimensions(4)
    .rotations()
    .material({ name: new Color3(0, 0, 1), uvScale: 3 })
    .physics();

  addInterpolateValueActionTo(scene)
    .when('OnRightPickTrigger')
    .at(interpolateActionBox)
    .set('rotation')
    .for(interpolateActionBox)
    .to(new Vector3(Math.PI / 4, Math.PI / 4, Math.PI / 4))
    .within(3000);

  const head = Camera(scene, new Vector3(0, 2, 0)).fold();
  const body = addBox('playerMesh')
    .positions({ x: 0, y: 1, z: -18 })
    .dimensions({ x: 1, y: 2, z: 1 })
    .rotations({ x: 0, y: 0, z: 0 })
    .material()
    .physics({ body: { mass: 1, friction: 0 } });
  head.parent = body;
  const { mouse: playerMouseController, keyboard: playerKeyboardController } =
    doPlayerController(body, head);

  scene.onPointerMove = playerMouseController.handleMove;
  scene.onKeyboardObservable.add(playerKeyboardController.registerInputs);
  scene.registerBeforeRender(() => playerKeyboardController.move());

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

  const collidingBox = addBox('collidingBox')
    .positions({ x: -12, y: 12, z: 15 })
    .dimensions(4)
    .rotations()
    .material({ name: new Color3(0, 0, 1), uvScale: 3 })
    .physics({ body: { mass: 1, restitution: 0.5 } });

  collidingBox.checkCollisions = true;

  registerCollisionFrom(collidingBox)
    .on(ground)
    .triggers(doGiveColliderRedTexture(scene));

  const winSphere = addSphere('winSphere')
    .positions({ x: 12, y: 20, z: 15 })
    .dimensions(2)
    .rotations()
    .material({ name: 'stone', uvScale: 2 })
    .physics({ body: { mass: 1, restitution: 1 } });

  const winBox = addBox('winBox')
    .positions({ x: 12, y: 1, z: 15 })
    .dimensions({ x: 4, y: 2, z: 4 })
    .rotations()
    .material({ name: new Color3(0, 1, 0), uvScale: 4 })
    .physics();

  winBox.visibility = 0.7;
  const onFirstIntersectionBetween = doOnFirstIntersectionBetween(scene);
  onFirstIntersectionBetween(winSphere).and(winBox).triggers(hideIntersected);

  const targetSphere = addSphere('targetSphere')
    .positions({ x: 0, y: 2.5, z: 10 })
    .dimensions(5)
    .rotations()
    .material({ name: new Color3(0.5, 0.6, 0.1), uvScale: 4 })
    .physics({ body: { mass: 0 } });

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
