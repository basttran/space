import {
  AbstractMesh,
  Color3,
  Scene,
  ShadowGenerator,
  Vector3,
} from '@babylonjs/core';
import { addEnvironmentTexture } from './assets/environment';
import {
  addDirectionalLight,
  addHemisphericLight,
  addPointLight,
  addSpotLight,
} from './assets/lights';
import {
  BoxGeometry,
  GroundGeometry,
  MeshOptions,
  SphereGeometry,
  addBox,
  addGround,
  addSphere,
} from './assets/meshes';
import { addAssets, addModel } from './assets/models';
import { addPhysics } from './assets/physics';
import { addPlayer } from './assets/player';
import { addMeshActionTo, addSceneActionTo } from './logic/actions';
import { ActionBinding } from './logic/game';

export class Level extends Scene {
  neons: AbstractMesh[] = [];
  models: AbstractMesh[] = [];
  shadowGenerator: ShadowGenerator | null = null;

  setPhysics = async (gravity: Vector3) => {
    addPhysics(this as Scene, gravity, 'cannonjs');
    // await addAmmoPhysics(this, gravity);
  };

  setHemisphericLight = (position: Vector3, intensity: number) => {
    const hemisphericLight = addHemisphericLight(this, position, intensity);
    return hemisphericLight;
  };

  setDirectionalLight = (position: Vector3, intensity: number) => {
    const hemisphericLight = addDirectionalLight(this, position, intensity);
    return hemisphericLight;
  };
  setPointLight = (position: Vector3, intensity: number) => {
    const hemisphericLight = addPointLight(this, position, intensity);
    return hemisphericLight;
  };
  setSpotLight = (
    position: Vector3,
    intensity: number,
    direction: Vector3,
    angle: number,
    exponent: number,
    color?: Color3
  ) => {
    const hemisphericLight = addSpotLight(
      this,
      position,
      direction,
      intensity,
      angle,
      exponent,
      color
    );
    return hemisphericLight;
  };

  setPlayer = (position: Vector3) => {
    const camera = addPlayer(this, position);
    return camera;
  };
  setBox = (spatial: BoxGeometry, options?: MeshOptions) => {
    const box = addBox(this, spatial, options);
    return box;
  };
  setSphere = (spatial: SphereGeometry, options?: MeshOptions) => {
    const box = addSphere(this, spatial, options);
    return box;
  };
  setGround = (spatial: GroundGeometry, options?: MeshOptions) => {
    const ground = addGround(this, spatial, options);
    return ground;
  };

  setAssets = () => {
    return addAssets(this);
  };
  setModels = async (
    file: { path: string; name: string },
    progressTracker?: Function
  ) => {
    const meshes = await addModel(this, file, progressTracker);
    return meshes;
  };
  setEnvironmentTexture = (path: string) => {
    addEnvironmentTexture(this, path);
  };
  setActions = (actionBinding: ActionBinding) => {
    // TODO
  };
}
