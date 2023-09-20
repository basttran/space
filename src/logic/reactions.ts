import {
  AbstractMesh,
  Color3,
  PhysicsImpostor,
  StandardMaterial,
  Scene,
} from '@babylonjs/core';

export const doGiveCollidedRedTexture =
  (scene: Scene) => (_collider: PhysicsImpostor, collided: PhysicsImpostor) => {
    const redMat = new StandardMaterial('red', scene);
    redMat.diffuseColor = new Color3(1, 0, 0);
    (collided.object as AbstractMesh).material = redMat;
  };
export const doGiveColliderRedTexture =
  (scene: Scene) => (collider: PhysicsImpostor, _collided: PhysicsImpostor) => {
    const redMat = new StandardMaterial('red', scene);
    redMat.diffuseColor = new Color3(1, 0, 0);
    (collider.object as AbstractMesh).material = redMat;
  };
export const doGiveCollideesRedTexture =
  (scene: Scene) => (collider: PhysicsImpostor, collided: PhysicsImpostor) => {
    const redMat = new StandardMaterial('red', scene);
    redMat.diffuseColor = new Color3(1, 0, 0);
    (collider.object as AbstractMesh).material = redMat;
    (collided.object as AbstractMesh).material = redMat;
  };
