import { Vector3 } from '@babylonjs/core';

export type ActionBinding = any;
export const ENVIRONMENT_TEXTURE_PATH: string = `${process.env.PUBLIC_URL}/textures/environment/street.env`;
export const GRAVITY_VECTOR = new Vector3(0, -9.81, 0);
export const ACTIONS_MAPPER: ActionBinding[] = [];
export type File = { path: string; name: string };

export const MODELS_FILE2: File = {
  path: `${process.env.PUBLIC_URL}/textures/models/`,
  name: 'target.glb',
};
