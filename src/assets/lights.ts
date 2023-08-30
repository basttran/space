import {
  Color3,
  DirectionalLight,
  GizmoManager,
  HemisphericLight,
  Light,
  LightGizmo,
  Mesh,
  PointLight,
  ShadowGenerator,
  SpotLight,
  Vector3,
  Scene,
} from "@babylonjs/core";

// export const addShadowCasting = (scene: Scene, mesh: Mesh): void => {
//   scene.shadowGenerator?.addShadowCaster(mesh);
// };

export const addHemisphericLight = (
  scene: Scene,
  position: Vector3,
  intensity: number,
  color?: Color3,
  specular?: Color3
) => {
  const light = new HemisphericLight("hemi1", position, scene);

  if (color) {
    light.diffuse = color;
  }
  light.intensity = intensity;
  // light.groundColor = new Color3(0.5, 0.2, 0);
  if (specular) {
    light.specular = specular;
  }
  // addGizmo(scene, light);
};

export const addDirectionalLight = (
  scene: Scene,
  direction: Vector3,
  intensity: number,
  color?: Color3
) => {
  const light = new DirectionalLight("direct1", direction, scene);
  if (color) {
    light.diffuse = color;
  }
  light.intensity = intensity;
};

export const addPointLight = (
  scene: Scene,
  position: Vector3,
  intensity: number,
  color?: Color3
) => {
  const light = new PointLight("point1", position, scene);

  if (color) {
    light.diffuse = new Color3(0.4, 0.4, 0.9);
  }
  light.intensity = intensity;
};

export const addSpotLight = (
  scene: Scene,
  position: Vector3,
  direction: Vector3,
  intensity: number,
  angle: number,
  exponent: number,
  color?: Color3
) => {
  const light = new SpotLight(
    "spot1",
    position,
    direction,
    angle,
    exponent,
    scene
  );
  if (color) {
    light.diffuse = new Color3(0.4, 0.4, 0.9);
  }
  light.intensity = intensity;
};
export const addGizmo = (scene: Scene, customLight: Light) => {
  const lightGizmo = new LightGizmo();
  lightGizmo.scaleRatio = 2;
  lightGizmo.light = customLight;

  const gizmoManager = new GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.usePointerToAttachGizmos = false;
  gizmoManager.attachToMesh(lightGizmo.attachedMesh);
};

// const lightClone = light.clone("lightClone") as PointLight;
// light.parent = scene.neons[0];
// lightClone.parent = scene.neons[1];

export const handleShadows = (light: SpotLight, meshes: Mesh[]) => {
  light.shadowEnabled = true;
  const shadowGenerator = new ShadowGenerator(2048, light);
  light.shadowMinZ = 0.1;
  light.shadowMaxZ = 10;
  shadowGenerator.useBlurCloseExponentialShadowMap = true;
  meshes.map((mesh) => {
    mesh.receiveShadows = true;
    shadowGenerator.addShadowCaster(mesh);
    return mesh;
  });
};
