import {
  FreeCamera,
  FreeCameraMouseInput,
  KeyboardInfo,
  Mesh,
  Vector3,
} from '@babylonjs/core';
import { FreeCameraCustomMouseInput } from './FreeCameraCustomMouseInput';

export const doToggleMouseYAxis = (player: FreeCamera) => {
  let inverted = true;
  return (e: KeyboardInfo) => {
    if (e.event.key === ' ' && e.type === 1) {
      if (inverted) {
        player.inputs.removeByType('FreeCameraCustomMouseInput');
        player.inputs.add(new FreeCameraMouseInput(false));
      } else {
        player.inputs.removeByType('FreeCameraMouseInput');
        player.inputs.add(new FreeCameraCustomMouseInput(false));
      }
      inverted = !inverted;
    }
  };
};

export const doPropel = (playerMesh: Mesh) => {
  return (e: KeyboardInfo) => {
    if (e.event.key === ' ' && e.type === 1) {
      if (playerMesh.physicsImpostor) {
        console.log('e.event.key: ', e.event.key);
        playerMesh.physicsImpostor?.applyImpulse(
          new Vector3(0, 10, 0), // box.up.multiplyByFloats(-3, 0, 0), // new Vector3(0, 10, 0),
          playerMesh.getAbsolutePosition().add(new Vector3(0, -1.5, 0))
        );
      }
    }
  };
};
