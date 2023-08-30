import { Mesh, PhysicsImpostor } from '@babylonjs/core';

type CollisionEffect = (
  collider: PhysicsImpostor,
  collided: PhysicsImpostor
) => void;

export const logCollision = (
  collider: PhysicsImpostor,
  collided: PhysicsImpostor
): void => console.log({ collider, collided });

export const registerCollisionFrom = (collider: Mesh) => {
  return {
    on: (collided: Mesh) => {
      return {
        triggers: (effect: CollisionEffect = logCollision) => {
          if (!collider.physicsImpostor || !collided.physicsImpostor) {
            return;
          }
          collider.physicsImpostor.registerOnPhysicsCollide(
            collided.physicsImpostor,
            effect
          );
        },
      };
    },
  };
};
