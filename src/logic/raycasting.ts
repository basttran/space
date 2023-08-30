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
  const blue = new PBRMaterial('blue', scene);
  const orange = new PBRMaterial('orange', scene);
  const green = new PBRMaterial('green ', scene);
  blue.roughness = 1;
  orange.roughness = 1;
  green.roughness = 1;

  blue.albedoTexture = new Texture('./textures/splatters/blue.png', scene);
  orange.albedoTexture = new Texture('./textures/splatters/orange.png', scene);
  green.albedoTexture = new Texture('./textures/splatters/green.png', scene);

  blue.albedoTexture.hasAlpha = true;
  orange.albedoTexture.hasAlpha = true;
  green.albedoTexture.hasAlpha = true;

  blue.zOffset = -12;
  orange.zOffset = -12;
  green.zOffset = -12;

  return [blue, orange, green];
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
      const { pickedPoint, pickedMesh } = raycastHit;
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
