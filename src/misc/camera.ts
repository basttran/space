import { ArcRotateCamera, Mesh, Vector3 } from "@babylonjs/core";

export const setCamera = (canvas: WebGLRenderingContext) => {
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  camera.speed = 0.25;

  return {
    bindTo: (parent: Mesh) => {
      camera.parent = parent;
    },
  };
};
