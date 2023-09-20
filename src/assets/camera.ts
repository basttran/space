import { FreeCamera, Scene, UniversalCamera, Vector3 } from '@babylonjs/core';
import { Thing } from './meshes';

export const Camera = (scene: Scene, position: Vector3) =>
  Thing(new UniversalCamera('camera', position, scene));

const targetTo = (target: Vector3) => (camera: FreeCamera) => {
  camera.setTarget(target);
  return camera;
};

const minZto = (minZ: number) => (camera: UniversalCamera) => {
  camera.minZ = minZ;
  return camera;
};

export const cameraModifiers = {
  targetTo,
  minZto,
};
