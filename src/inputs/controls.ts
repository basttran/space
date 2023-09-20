import {
  IPointerEvent,
  KeyboardInfo,
  Mesh,
  Space,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';
import { GRAVITY_VECTOR } from '../logic/game';

type PlayerState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  yFactor: number;
};

export const doPlayerController = (player: Mesh, camera: UniversalCamera) => {
  const SPEED = 10;
  const state = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    yFactor: 1,
  };

  return {
    mouse: {
      handleMove: (event: IPointerEvent) => {
        player.rotate(
          new Vector3(0, 1, 0),
          event.movementX * 0.005,
          Space.LOCAL
        );
        if (xCalculatedRotation(camera, state, event) > 1.5) {
          return;
        }
        camera.rotation.x += state.yFactor * event.movementY * 0.005;
      },
    },
    keyboard: {
      registerInputs: (e: KeyboardInfo | IPointerEvent) => {
        const { event, type } = e as KeyboardInfo;
        if (event.key === 'z') {
          state.forward = type === 1;
        }
        if (event.key === 's') {
          state.backward = type === 1;
        }
        if (event.key === 'q') {
          state.left = type === 1;
        }
        if (event.key === 'd') {
          state.right = type === 1;
        }
        if (event.key === '²' && type === 2) {
          state.yFactor = -1 * state.yFactor;
        }
        if (event.key === ' ') {
          if (state.up === false && type === 1 && canJump(player)) {
            state.up = true;
            setTimeout(() => {
              state.up = false;
            }, 750);
          }
        }
      },
      move: () => {
        const { forward, right } = player;
        const yVelocity = yComputedVelocity(state, player);
        const xVelocity = xComputedVelocity(forward, state);
        const zVelocity = zComputedVelocity(right, state);
        const velocity = horizontalVelocity(xVelocity, zVelocity, SPEED)
          .add(GRAVITY_VECTOR)
          .add(yVelocity);
        player.physicsImpostor?.setLinearVelocity(velocity);
      },
    },
  };
};

const canJump = (player: Mesh) => {
  return player.position.y < 1.2;
};
const xCalculatedRotation = (
  camera: UniversalCamera,
  state: PlayerState,
  event: IPointerEvent
) => {
  return Math.abs(camera.rotation.x + state.yFactor * event.movementY * 0.005);
};
const horizontalVelocity = (
  xVelocity: Vector3,
  zVelocity: Vector3,
  SPEED: number
) => {
  return xVelocity.add(zVelocity).normalize().scale(SPEED);
};

const yComputedVelocity = (state: PlayerState, player: Mesh) => {
  return state.up === true ? player.up.scale(15) : new Vector3(0, 0, 0);
};

const zComputedVelocity = (right: Vector3, state: PlayerState) => {
  return right
    .scale(Number(state.right))
    .add(right.scale(-1 * Number(state.left)));
};

const xComputedVelocity = (forward: Vector3, state: PlayerState) => {
  return forward
    .scale(Number(state.forward))
    .add(forward.scale(-1 * Number(state.backward)));
};
