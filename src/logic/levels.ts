import {
  Color3,
  Engine,
  FreeCamera,
  FreeCameraMouseInput,
  KeyboardInfo,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { addEnvironmentTexture } from '../assets/environment';
import {
  addDirectionalLight,
  addHemisphericLight,
  addPointLight,
  addSpotLight,
} from '../assets/lights';
import { addGround, doAddBox, doAddSphere } from '../assets/meshes';
import { addPhysics } from '../assets/physics';
import { addPlayer } from '../assets/player';
import { FreeCameraCustomMouseInput } from '../inputs/FreeCameraCustomMouseInput';
import {
  addInterpolateValueActionTo,
  addMeshActionTo,
  addSceneActionTo,
} from './actions';
import { registerCollisionFrom } from './collisions';
import { ENVIRONMENT_TEXTURE_PATH, GRAVITY_VECTOR } from './game';
import { doOnFirstIntersectionBetween, hideIntersected } from './intersections';
import { hit } from './raycasting';
import { doGiveColliderRedTexture } from './reactions';
import { enablePointerLock } from './scene';
import { doToggleMouseYAxis } from '../inputs/controls';

export const loadLevel = async (scene: Scene, engine: Engine) => {
  await addPhysics(scene, GRAVITY_VECTOR);
  addEnvironmentTexture(scene, ENVIRONMENT_TEXTURE_PATH);
  const ground = addGround(
    scene,
    'ground',
    { size: 40 },
    {
      physics: { body: { mass: 0, restitution: 0.5 } },
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

  const player = addPlayer(scene, new Vector3(0, 4, -18));
  scene.onKeyboardObservable.add(doToggleMouseYAxis(player));

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
    .positions({ x: 12, y: 2, z: 15 })
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

  // const targets = await addModel(scene, MODELS_FILE2);
  // targets.shift();
  // const target = Mesh.MergeMeshes(
  //   targets as Mesh[],
  //   true,
  //   true,
  //   undefined,
  //   false,
  //   true
  // );
  // if (target) {
  //   target.position.y = 3.5;
  //   target.position.z = -12;
  //   target.rotation.y = (Math.PI * 3) / 2;
  //   createAnimation(
  //     scene,
  //     'rotation',
  //     target,
  //     'rotation.x',
  //     [
  //       { frame: 0, value: 0 },
  //       { frame: 180, value: Math.PI / 2 },
  //     ],
  //     Animation.ANIMATIONTYPE_FLOAT,
  //     Animation.ANIMATIONLOOPMODE_CYCLE
  //   );
  //   createAnimation(
  //     scene,
  //     'translation',
  //     target,
  //     'position',
  //     [
  //       { frame: 0, value: new Vector3(0, 3.75, -12) },
  //       { frame: 30, value: new Vector3(0.3, 4, -12) },
  //       { frame: 60, value: new Vector3(0.3, 3.5, -12) },
  //       { frame: 90, value: new Vector3(0, 3, -12) },
  //       { frame: 120, value: new Vector3(-0.3, 3.5, -12) },
  //       { frame: 150, value: new Vector3(-0.3, 3.75, -12) },
  //       { frame: 180, value: new Vector3(0, 3.75, -12) },
  //     ],
  //     Animation.ANIMATIONTYPE_VECTOR3,
  //     Animation.ANIMATIONLOOPMODE_CYCLE
  //   );
  // }
  enablePointerLock(scene, engine, hit(targetSphere.name, scene, player));
};
