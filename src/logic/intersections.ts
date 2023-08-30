import { Mesh, Scene } from '@babylonjs/core';

type IntersectionEffect = (intersecter: Mesh, intersected: Mesh) => void;

export const doDetectIntersectionBetween =
  (scene: Scene) => (collider: Mesh) => {
    return {
      and: (collided: Mesh) => {
        scene.registerBeforeRender(() =>
          console.log('intersects', collider.intersectsMesh(collided))
        );
      },
    };
  };

export const logIntersection = (intersecter: Mesh, intersected: Mesh): void =>
  console.log({ intersecter, intersected });
export const hideIntersected = (
  _intersecter: Mesh,
  intersected: Mesh
): void => {
  intersected.visibility = 0.2;
};
export const doOnFirstIntersectionBetween = (scene: Scene) => {
  return (intersecter: Mesh) => {
    return {
      and: (intersected: Mesh) => {
        return {
          triggers: (effect: IntersectionEffect = logIntersection) => {
            const callback = () => {
              if (intersecter.intersectsMesh(intersected)) {
                scene.unregisterBeforeRender(callback);
                effect(intersecter, intersected);
              }
            };
            scene.registerBeforeRender(callback);
          },
        };
      },
    };
  };
};
