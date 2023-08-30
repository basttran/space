import {
  AbstractMesh,
  Material,
  Nullable,
  PhysicsImpostor,
} from "@babylonjs/core";

export const doToggleMaterial = (
  target: PhysicsImpostor,
  material: Material | null
) => {
  if (!material || (target.object as AbstractMesh).material === null) {
    return;
  }
  const materials: { old: Nullable<Material>; new: Nullable<Material> } = {
    old: (target.object as AbstractMesh).material,
    new: material,
  };
  let counter = 0;
  return (collider: PhysicsImpostor, _collided: PhysicsImpostor) => {
    if (counter % 2 === 0) {
      (collider.object as AbstractMesh).material = materials.new;
    } else {
      (collider.object as AbstractMesh).material = materials.old;
    }
    counter += 1;
  };
};
