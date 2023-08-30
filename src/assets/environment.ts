import { CubeTexture, Scene } from "@babylonjs/core";

export const addEnvironmentTexture = (scene: Scene, path: string) => {
  const envTex = CubeTexture.CreateFromPrefilteredData(path, scene);
  scene.environmentTexture = envTex;
  scene.createDefaultSkybox(envTex, true);
};
