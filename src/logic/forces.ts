import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  FreeCamera,
  Mesh,
  PBRMaterial,
  Vector3,
  Scene,
} from '@babylonjs/core';
import { WHEN } from './actions';
import { addBox, addSphere } from '../assets/meshes';

export const forcesCanonballExamples = (
  scene: Scene,
  camera: FreeCamera,
  ground: Mesh
) => {
  const box = addBox(
    scene,
    'targetBox',
    {
      positions: { x: 0, y: 2, z: 0 },
      dimensions: { x: 2, y: 4, z: 2 },
    },
    {
      physics: { body: { mass: 0.5, friction: 1 } },
    }
  );
  const boxMat = new PBRMaterial('boxMat', scene);
  boxMat.roughness = 1;
  boxMat.albedoColor = new Color3(1, 0.5, 0);
  box.material = boxMat;

  box.actionManager = new ActionManager(scene);

  box.actionManager.registerAction(
    new ExecuteCodeAction(WHEN.OnPickDownTrigger, () => {
      box.physicsImpostor?.applyImpulse(
        new Vector3(-3, 0, 0), // box.up.multiplyByFloats(-3, 0, 0), // new Vector3(0, 10, 0),
        box.getAbsolutePosition().add(new Vector3(0, 2, 0))
      );
    })
  );

  const cannonball = createCannonball(scene, camera);

  scene.onPointerDown = (e) => {
    if (e.button === 2) {
      shootCannonball(cannonball, camera, ground);
    }
  };
};
const createCannonball = (scene: Scene, camera: FreeCamera) => {
  const cannonball = addSphere(
    scene,
    'cannonball',
    {
      dimensions: 0.5,
    },
    { physics: { body: { mass: 1, friction: 1 } } }
  );

  const cannonballMat = new PBRMaterial('sphereMat', scene);
  cannonballMat.roughness = 1;
  cannonballMat.albedoColor = new Color3(0, 1, 0);
  cannonball.material = cannonballMat;
  cannonball.position = camera.position;
  cannonball.setEnabled(false);
  return cannonball;
};

const shootCannonball = (
  cannonball: Mesh,
  camera: FreeCamera,
  ground: Mesh
) => {
  const clone = cannonball.clone('clone');
  clone.position = camera.position.add(new Vector3(0, 0, 5));
  clone.setEnabled(true);
  // clone.physicsImpostor?.applyForce(
  //   camera.getForwardRay().direction.scale(1500),
  //   clone.getAbsolutePosition()
  // );
  if (ground.physicsImpostor) {
    clone.physicsImpostor?.registerOnPhysicsCollide(
      ground.physicsImpostor,
      () => {
        setTimeout(() => {
          clone.dispose();
        }, 3000);
      }
    );
  }
};
