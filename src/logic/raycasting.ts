import {
  FreeCamera,
  IPointerEvent,
  Matrix,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from '@babylonjs/core';

export const buildSplatters = (scene: Scene) => {
  return ['blue', 'orange', 'green'].map((color) =>
    toSplatterMaterial(scene, color)
  );
};

export const hit = (name: string, scene: Scene, camera: FreeCamera) => {
  const splatters: PBRMaterial[] = buildSplatters(scene);
  return (event: IPointerEvent) => {
    const ray = scene.createPickingRay(
      event.target.width / 2,
      event.target.height / 2,
      Matrix.Identity(),
      camera
    );

    const raycastHit = scene.pickWithRay(ray);
    const normal = raycastHit?.getNormal(true);
    if (
      raycastHit?.hit &&
      raycastHit.pickedPoint &&
      normal &&
      raycastHit.pickedMesh?.name === name
    ) {
      const decal = MeshBuilder.CreateDecal('decal', raycastHit.pickedMesh, {
        position: raycastHit.pickedPoint,
        normal,
        size: new Vector3(1, 1, 1),
      });
      decal.rotation.z = Math.PI / Math.random();
      decal.material = splatters[Math.floor(Math.random() * splatters.length)];
      decal.setParent(raycastHit.pickedMesh);
      raycastHit.pickedMesh.physicsImpostor?.applyImpulse(
        ray.direction,
        raycastHit.pickedPoint
      );
    }
  };
};

const toSplatterMaterial = (scene: Scene, splatterColor: string) => {
  const splatterMaterial = new PBRMaterial(splatterColor, scene);
  splatterMaterial.roughness = 1;
  splatterMaterial.albedoTexture = new Texture(
    `${process.env.PUBLIC_URL}/textures/splatters/${splatterColor}.png`,
    scene
  );
  splatterMaterial.albedoTexture.hasAlpha = true;
  splatterMaterial.zOffset = -0.5;
  return splatterMaterial;
};
