import {
  AbstractMesh,
  Color3,
  Color4,
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
  Vector4,
} from '@babylonjs/core';
import { addMaterial } from './materials';

export type MeshAestheticOptions = {
  name: string | Color3;
  uvScale: number | { uScale: number; vScale: number };
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

export type Sizing = Size | Format | Dimensions;

export type Size = number;

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

type BoxOptions = {
  size?: number;
  width?: number;
  height?: number;
  depth?: number;
  faceUV?: Vector4[];
  faceColors?: Color4[];
  sideOrientation?: number;
  frontUVs?: Vector4;
  backUVs?: Vector4;
  wrap?: boolean;
  topBaseAt?: number;
  bottomBaseAt?: number;
  updatable?: boolean;
};

type SphereOptions = {
  segments?: number;
  diameter?: number;
  diameterX?: number;
  diameterY?: number;
  diameterZ?: number;
  arc?: number;
  slice?: number;
  sideOrientation?: number;
  frontUVs?: Vector4;
  backUVs?: Vector4;
  updatable?: boolean;
};

export const Box = (name: string, scene: Scene, options: BoxOptions = {}) =>
  Thing(MeshBuilder.CreateBox(name, options, scene));
export const Sphere = (
  name: string,
  scene: Scene,
  options: SphereOptions = {}
) => Thing(MeshBuilder.CreateSphere(name, options, scene));
export const Ground = (name: string, scene: Scene, options: BoxOptions = {}) =>
  Thing(MeshBuilder.CreateGround(name, options, scene));

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

export const removeMeshesByName = (
  meshes: AbstractMesh[],
  scene: Scene,
  name: string
) => {
  const meshestoRemove = meshes.filter((mesh) => mesh.name === name);
  meshestoRemove.forEach((mesh) => scene.removeMesh(mesh));
};
