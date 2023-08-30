import { ISceneLoaderProgressEvent, Scene, SceneLoader } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export const addModel = async (
  scene: Scene,
  file: {
    path: string;
    name: string;
  },
  progressTracker: Function = (event: ISceneLoaderProgressEvent) =>
    console.log(event)
) => {
  const { meshes } = await SceneLoader.ImportMeshAsync(
    '',
    file.path,
    file.name,
    scene,
    (event) => progressTracker(event),
    '.glb'
  );

  return meshes;
};
