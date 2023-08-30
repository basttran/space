import { FreeCamera, Vector3, Scene } from '@babylonjs/core';
import { FreeCameraCustomMouseInput } from '../inputs/FreeCameraCustomMouseInput';
import { FreeCameraCustomKeyboardMoveInput } from '../inputs/FreeCameraCustomKeyboardMoveInput';

export const addPlayer = (scene: Scene, position: Vector3): FreeCamera => {
  const camera = new FreeCamera('camera', position, scene);
  camera.inputs.removeByType('FreeCameraMouseInput');
  camera.inputs.removeByType('FreeCameraKeyboardMoveInput');
  const invertedMouseInput = new FreeCameraCustomMouseInput(false);
  const wasdKeyboard = new FreeCameraCustomKeyboardMoveInput();
  camera.inputs.add(invertedMouseInput);
  camera.inputs.add(wasdKeyboard);
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new Vector3(1, 1, 1);
  camera.minZ = 0.45;
  camera.attachControl();
  camera.speed = 0.75;
  camera.angularSensibility = 4000;
  return camera;
};
