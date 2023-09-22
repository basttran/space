import {
  IPointerEvent,
  KeyboardInfo,
  Mesh,
  Space,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';
import { GRAVITY_VECTOR } from '../logic/game';
import { FRAMES_PER_SECOND, GRAVITY } from '../assets/physics';

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
    yFactor: -1,
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
          }
        }
      },
    },
    player: {
      move: () => {
        const { forward, right, up } = player;
        const yVelocity = yComputedVelocity(up, state);
        const xVelocity = xComputedVelocity(forward, state);
        console.log('xVelocity: ', xVelocity);
        const zVelocity = zComputedVelocity(right, state);
        const velocity = horizontalVelocity(xVelocity, zVelocity, SPEED).add(
          verticalVelocity(GRAVITY_VECTOR, yVelocity)
        );
        player.physicsImpostor?.setLinearVelocity(velocity);
      },
    },
  };
};

const canJump = (player: Mesh) => {
  return player.position.y < 2.02;
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
const verticalVelocity = (gravity: Vector3, yVelocity: Vector3) => {
  return gravity.add(yVelocity);
};

const doHandleJump = () => {
  let count = FRAMES_PER_SECOND;
  return (state: PlayerState) => {
    if (state.up === false) {
      return 0;
    }
    if (count <= 0) {
      count = FRAMES_PER_SECOND;
      state.up = false;
      return 0;
    }
    count--;
    console.log('count: ', count);
    return GRAVITY * -2.5 * (count / FRAMES_PER_SECOND);
  };
};
const handleJump = doHandleJump();

const yComputedVelocity = (up: Vector3, state: PlayerState): Vector3 => {
  return state.up === true ? up.scale(handleJump(state)) : new Vector3(0, 0, 0);
};

const zComputedVelocity = (right: Vector3, state: PlayerState): Vector3 => {
  return right
    .scale(Number(state.right))
    .add(right.scale(-1 * Number(state.left)));
};

const xComputedVelocity = (forward: Vector3, state: PlayerState): Vector3 => {
  return forward
    .scale(Number(state.forward))
    .add(forward.scale(-1 * Number(state.backward)));
};
