import {
  FreeCamera,
  MeshBuilder,
  PhysicsImpostor,
  SceneLoader,
  Vector3,
  Scene,
} from '@babylonjs/core';

export const rocketVelocityExample = async (
  scene: Scene,
  camera: FreeCamera
) => {
  const { meshes: rockets } = await SceneLoader.ImportMeshAsync(
    '',
    './textures/models/',
    'toon_rocket.glb',
    scene,
    () => {},
    '.glb'
  );

  const rocket = rockets[0];

  const rocketColliderMesh = MeshBuilder.CreateBox('rocketCollider', {
    width: 1,
    height: 1.7,
    depth: 1,
  });

  rocketColliderMesh.position.y = 0.87;
  rocketColliderMesh.visibility = 0.25;
  rocket.setParent(rocketColliderMesh);

  rocketColliderMesh.physicsImpostor = new PhysicsImpostor(
    rocketColliderMesh,
    PhysicsImpostor.BoxImpostor,
    { mass: 1 }
  );

  rocketColliderMesh.rotate(Vector3.Forward(), 1.5);

  const rocketVelocity = () => {
    const SPEED = 10;
    if (rocketColliderMesh.physicsImpostor) {
      camera.position = new Vector3(
        rocketColliderMesh.position.x,
        rocketColliderMesh.position.y,
        camera.position.z
      );
      rocketColliderMesh.physicsImpostor.setLinearVelocity(
        rocketColliderMesh.up.scaleInPlace(SPEED)
      );
      rocketColliderMesh.physicsImpostor.setAngularVelocity(
        rocketColliderMesh.up
      );
    }
  };

  let gameOver = false;
  if (!gameOver) {
    scene.registerBeforeRender(rocketVelocity);
  }

  scene.onPointerDown = () => {
    gameOver = true;
    scene.unregisterBeforeRender(rocketVelocity);
  };
};
