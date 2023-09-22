import { CannonJSPlugin, Scene, Vector3 } from '@babylonjs/core';
import * as CANNON from 'cannon';
export const GRAVITY = -9.81;
export const FRAMES_PER_SECOND = 60;

export const addPhysics = async (
  scene: Scene,
  gravity: Vector3 | undefined
) => {
  scene.gravity = new Vector3(0, GRAVITY / FRAMES_PER_SECOND, 0);
  scene.collisionsEnabled = true;
  scene.enablePhysics(gravity, new CannonJSPlugin(true, 10, CANNON));
};
