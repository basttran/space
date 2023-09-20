import {
  AbstractMesh,
  Color3,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  PhysicsImpostorParameters,
  PointLight,
  Scene,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import { addMaterial } from './materials';
import { addPhysicsToMesh } from './physics';

export type MeshAestheticOptions = {
  name: string | Color3;
  uvScale: number | { uScale: number; vScale: number };
};
export type MeshPhysicOptions = {
  body?: PhysicsImpostorParameters;
  shadow?: boolean;
};

export type MeshOptions = {
  material?: MeshAestheticOptions;
  physics?: MeshPhysicOptions;
};

export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type Dimensions = Coordinates;

export type Format = {
  x: number;
  y: number;
};

export type BoxGeometry = {
  positions: Coordinates;
  dimensions: Coordinates | number;
  rotations?: Coordinates;
};

export type SphereGeometry = {
  positions?: Coordinates;
  dimensions: Coordinates | number;
  rotations?: Coordinates;
};

export type GroundGeometry = {
  size: Format | number;
  positions?: Coordinates;
  rotations?: Coordinates;
};

export type Sizing = Size | Format | Dimensions;

export type Size = number;

const vector3FromCoordinates = (coordinates: Coordinates) => {
  return new Vector3(coordinates.x, coordinates.y, coordinates.z);
};
export type ThingContent =
  | Mesh
  | HemisphericLight
  | DirectionalLight
  | PointLight
  | SpotLight;

export const Thing = <T>(content: T) => ({
  set: (lambda: Function) => Thing(lambda(content)),
  fold: (lambda: Function = (content: T): T => content) => lambda(content),
  inspect: () => `Mesh(${content})`,
});

export const Box = (name: string, scene: Scene) =>
  Thing(MeshBuilder.CreateBox(name, {}, scene));
export const Sphere = (name: string, scene: Scene) =>
  Thing(MeshBuilder.CreateSphere(name, {}, scene));
export const Ground = (name: string, scene: Scene) =>
  Thing(MeshBuilder.CreateGround(name, {}, scene));

export const doMaterialTo =
  (scene: Scene) => (material: MeshAestheticOptions) => (mesh: Mesh) => {
    addMaterial(material, scene, mesh);
    return mesh;
  };

const checkCollisionsTo = (checks: boolean) => (mesh: Mesh) => {
  mesh.checkCollisions = checks;
  return mesh;
};
const receiveShadowsTo = (receives: boolean) => (mesh: Mesh) => {
  mesh.receiveShadows = receives;
  return mesh;
};
const visibleTo = (visible: boolean) => (mesh: Mesh) => {
  mesh.isVisible = visible;
  return mesh;
};
const visibityTo = (visibility: number) => (mesh: Mesh) => {
  mesh.visibility = Math.max(Math.min(visibility, 1), 0);
  return mesh;
};

const positionTo = (position: Vector3) => (mesh: Mesh) => {
  mesh.position = position;
  return mesh;
};

const rotationTo = (rotation: Vector3) => (mesh: Mesh) => {
  mesh.rotation = rotation;
  return mesh;
};

const boxPhysicsTo = (physics: PhysicsImpostorParameters) => (mesh: Mesh) => {
  mesh.physicsImpostor = new PhysicsImpostor(
    mesh,
    PhysicsImpostor.BoxImpostor,
    physics
  );
  return mesh;
};
const spherePhysicsTo =
  (physics: PhysicsImpostorParameters) => (mesh: Mesh) => {
    mesh.physicsImpostor = new PhysicsImpostor(
      mesh,
      PhysicsImpostor.SphereImpostor,
      physics
    );
    return mesh;
  };

const sizeTo = (sizing: Vector3) => (mesh: Mesh) => {
  mesh.scaling = sizing; // not sure
  return mesh;
};

export const meshModifiers = {
  sizeTo,
  spherePhysicsTo,
  boxPhysicsTo,
  rotationTo,
  positionTo,
  visibityTo,
  visibleTo,
  receiveShadowsTo,
  checkCollisionsTo,
};

export const addBox = (
  scene: Scene,
  name: string,
  spatial: BoxGeometry,
  options?: MeshOptions
): Mesh => {
  const box = handleBoxSpatialParameters(name, spatial, scene);
  if (options) {
    handleOptions(options, scene, box);
  }
  return box;
};

// export const doAddBox = (scene: Scene) => (name: string) => {
//   return {
//     spatial: (spatial: BoxGeometry) => {
//       return {
//         options: (options?: MeshOptions) => {},
//       };
//     },
//   };
// };

export const doAddBox = (scene: Scene) => (name: string) => {
  return {
    positions: (positions: Coordinates) => {
      return {
        dimensions: (dimensions: Coordinates | number) => {
          return {
            rotations: (rotations?: Coordinates) => {
              return {
                material: (material?: MeshAestheticOptions) => {
                  return {
                    physics: (physics?: MeshPhysicOptions) => {
                      const box = handleBoxSpatialParameters(
                        name,
                        { positions, dimensions, rotations },
                        scene
                      );
                      if (physics || material) {
                        handleOptions({ physics, material }, scene, box);
                      }
                      return box;
                    },
                  };
                },
              };
            },
          };
        },
      };
    },
  };
};

export const doAddSphere = (scene: Scene) => (name: string) => {
  return {
    positions: (positions: Coordinates) => {
      return {
        dimensions: (dimensions: Coordinates | number) => {
          return {
            rotations: (rotations?: Coordinates) => {
              return {
                material: (material?: MeshAestheticOptions) => {
                  return {
                    physics: (physics?: MeshPhysicOptions) => {
                      const sphere = handleSphereSpatialParameters(
                        name,
                        { positions, dimensions, rotations },
                        scene
                      );
                      if (physics || material) {
                        handleOptions({ physics, material }, scene, sphere);
                      }
                      return sphere;
                    },
                  };
                },
              };
            },
          };
        },
      };
    },
  };
};

export const addGround = (
  scene: Scene,
  name: string,
  spatial: GroundGeometry,
  options?: MeshOptions
): Mesh => {
  const ground = handleGroundSpatialParameters(name, spatial, scene);
  if (options) {
    handleOptions(options, scene, ground);
  }
  return ground;
};

export const addSphere = (
  scene: Scene,
  name: string,
  spatial: SphereGeometry,
  options?: MeshOptions
) => {
  const sphere = handleSphereSpatialParameters(name, spatial, scene);
  if (options) {
    handleOptions(options, scene, sphere);
  }
  return sphere;
};

const handleMeshAestheticOptions = (
  aestheticOptions: MeshAestheticOptions,
  scene: Scene,
  mesh: Mesh
) => {
  if (aestheticOptions) {
    addMaterial(aestheticOptions, scene, mesh);
  }
};

const handleMeshPhysicsOptions = (
  physicOptions: MeshPhysicOptions,
  mesh: Mesh
) => {
  if (physicOptions.body) {
    addPhysicsToMesh(mesh, physicOptions.body);
  }
  if (physicOptions.shadow) {
    // addShadowCasting(scene, mesh);
  }
};

const handleOptions = (options: MeshOptions, scene: Scene, box: Mesh) => {
  if (options.material) {
    handleMeshAestheticOptions(options.material, scene, box);
  }
  if (options.physics) {
    handleMeshPhysicsOptions(options.physics, box);
  }
};

const handleGroundSpatialParameters = (
  name: string,
  spatial: GroundGeometry,
  scene: Scene
) => {
  const { positions, size, rotations } = spatial;
  const dim =
    typeof size === 'number'
      ? { width: size, height: size }
      : { width: size.x, height: size.y };
  const ground = MeshBuilder.CreateGround(
    name,
    { width: dim.width, height: dim.height },
    scene
  );
  if (positions) {
    ground.position = vector3FromCoordinates(positions);
  }
  ground.checkCollisions = true;
  ground.isVisible = true;
  if (rotations) {
    ground.rotation = vector3FromCoordinates(rotations);
  }
  return ground;
};
const handleBoxSpatialParameters = (
  name: string,
  spatial: BoxGeometry,
  scene: Scene
) => {
  const { positions, dimensions, rotations } = spatial;
  const dim =
    typeof dimensions === 'number'
      ? { size: dimensions }
      : { width: dimensions.x, height: dimensions.y, depth: dimensions.z };
  const box = MeshBuilder.CreateBox(
    name,
    {
      ...dim,
    },
    scene
  );
  box.checkCollisions = true;
  box.position = vector3FromCoordinates(positions);
  if (rotations) {
    box.rotation = vector3FromCoordinates(rotations);
  }
  return box;
};

const handleSphereSpatialParameters = (
  name: string,
  spatial: SphereGeometry,
  scene: Scene
) => {
  const { positions, dimensions, rotations } = spatial;

  const dim =
    typeof dimensions === 'number'
      ? { diameter: dimensions }
      : {
          diameterX: dimensions.x,
          diameterY: dimensions.y,
          diameterZ: dimensions.z,
        };

  const sphere = MeshBuilder.CreateSphere(name, { ...dim }, scene);
  if (positions) {
    sphere.position = vector3FromCoordinates(positions);
  }
  if (rotations) {
    sphere.rotation = vector3FromCoordinates(rotations);
  }
  return sphere;
};

export const removeMeshesByName = (
  meshes: AbstractMesh[],
  scene: Scene,
  name: string
) => {
  const meshestoRemove = meshes.filter((mesh) => mesh.name === name);
  meshestoRemove.forEach((mesh) => scene.removeMesh(mesh));
};
