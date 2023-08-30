import {
  FreeCamera,
  FreeCameraMouseInput,
  KeyboardInfo,
} from '@babylonjs/core';
import { FreeCameraCustomMouseInput } from './FreeCameraCustomMouseInput';

export const doToggleMouseYAxis = (player: FreeCamera) => {
  let inverted = true;
  return (e: KeyboardInfo) => {
    if (e.event.key === '²' && e.type === 1) {
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
