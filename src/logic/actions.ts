import {
  ActionManager,
  IncrementValueAction,
  InterpolateValueAction,
  Mesh,
  Scene,
  SetValueAction,
  StandardMaterial,
  Vector3,
  Color3,
} from '@babylonjs/core';
import { Box, Sphere, doMaterialTo, meshModifiers } from '../assets/meshes';

export const WHEN = {
  NothingTrigger: 0,
  OnPickTrigger: 1,
  OnLeftPickTrigger: 2,
  OnRightPickTrigger: 3,
  OnCenterPickTrigger: 4,
  OnPickDownTrigger: 5,
  OnDoublePickTrigger: 6,
  OnPickUpTrigger: 7,
  OnPickOutTrigger: 16,
  OnLongPressTrigger: 8,
  OnPointerOverTrigger: 9,
  OnPointerOutTrigger: 10,
  OnEveryFrameTrigger: 11,
  OnIntersectionEnterTrigger: 12,
  OnIntersectionExitTrigger: 13,
  OnKeyDownTrigger: 14,
  OnKeyUpTrigger: 15,
} as const;

export const addMeshActionTo = (scene: Scene) => {
  return {
    when: (action: keyof typeof WHEN) => {
      return {
        at: (triggerAsset: Mesh) => {
          return {
            set: (propertyPath: string) => {
              return {
                for: (updatedAssets: Mesh[] = [triggerAsset]) => {
                  return {
                    to: (value: Vector3) => {
                      triggerAsset.actionManager = new ActionManager(scene);
                      updatedAssets.forEach((updatedAsset) => {
                        const formerValue = (updatedAsset as any)[propertyPath];
                        if (triggerAsset.actionManager) {
                          triggerAsset.actionManager
                            .registerAction(
                              new SetValueAction(
                                WHEN[action],
                                updatedAsset,
                                propertyPath,
                                value
                              )
                            )
                            ?.then(
                              new SetValueAction(
                                WHEN[action],
                                updatedAsset,
                                propertyPath,
                                formerValue || value
                              )
                            );
                        }
                      });
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

export const doAddInterpolateValueAction =
  (scene: Scene, togglable: boolean) => (action: keyof typeof WHEN) => {
    return {
      at: (triggerAsset: Mesh) => {
        return {
          make: (targetAsset: Mesh = triggerAsset) => {
            return {
              property: (propertyPath: string) => {
                return {
                  reach: (value: any) => {
                    return {
                      within: (milliseconds: number) => {
                        triggerAsset.actionManager = new ActionManager(scene);
                        const formerValue = (targetAsset.material as any)[
                          propertyPath
                        ];
                        const registeredAction =
                          triggerAsset.actionManager.registerAction(
                            new InterpolateValueAction(
                              WHEN[action],
                              targetAsset.material,
                              propertyPath,
                              value,
                              milliseconds
                            )
                          );
                        if (togglable && registeredAction) {
                          registeredAction?.then(
                            new InterpolateValueAction(
                              WHEN[action],
                              targetAsset.material,
                              propertyPath,
                              formerValue,
                              milliseconds
                            )
                          );
                        }
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

export const addInterpolateValueActionTo = (
  scene: Scene,
  togglable: boolean = true
) => {
  return {
    when: (action: keyof typeof WHEN) => {
      return {
        at: (triggerAsset: Mesh) => {
          return {
            set: (property: string) => {
              return {
                for: (targetAsset: Mesh = triggerAsset) => {
                  return {
                    to: (value: any) => {
                      return {
                        within: (milliseconds: number) => {
                          const path = property.split('.');
                          const target = path[1]
                            ? (targetAsset as any)[path[0]]
                            : targetAsset;
                          const propertyPath = path[1] ? path[1] : path[0];
                          const formerValue = path[1]
                            ? (targetAsset as any)[path[0]][path[1]]
                            : (targetAsset as any)[path[0]];
                          triggerAsset.actionManager = new ActionManager(scene);
                          const registeredAction =
                            triggerAsset.actionManager?.registerAction(
                              new InterpolateValueAction(
                                WHEN[action],
                                target,
                                propertyPath,
                                value,
                                milliseconds
                              )
                            );
                          if (togglable && registeredAction) {
                            registeredAction?.then(
                              new InterpolateValueAction(
                                WHEN[action],
                                target,
                                propertyPath,
                                formerValue,
                                milliseconds
                              )
                            );
                          }
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
    },
  };
};

export const addSceneActionTo = (scene: Scene, togglable: boolean = true) => {
  return {
    when: (action: keyof typeof WHEN) => {
      return {
        increment: (property: string) => {
          return {
            for: (targetAsset: Mesh) => {
              return {
                by: (value: number) => {
                  scene.actionManager = new ActionManager(scene);
                  scene.actionManager.registerAction(
                    new IncrementValueAction(
                      WHEN[action],
                      targetAsset,
                      property,
                      value
                    )
                  );
                },
              };
            },
          };
        },
      };
    },
  };
};

export const meshActionsExample = (scene: Scene) => {
  const materialTo = doMaterialTo(scene);
  const box = Box('switch', scene)
    .set(meshModifiers.positionTo(new Vector3(0, 2, 11)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .set(meshModifiers.sizeTo(new Vector3(4, 4, 4)))
    .fold(materialTo({ name: 'metal', uvScale: 3 }));

  addMeshActionTo(scene)
    .when('OnPickDownTrigger')
    .at(box)
    .set('scaling')
    .for([box])
    .to(new Vector3(0.5, 0.5, 0.5));

  const sphereMat = new StandardMaterial('sphereMat', scene);
  sphereMat.diffuseColor = new Color3(1, 0, 0);
  sphereMat.roughness = 1;

  const sphere = Sphere('cameleon', scene)
    .set(meshModifiers.positionTo(new Vector3(5, 2, 11)))
    .fold(meshModifiers.sizeTo(new Vector3(2, 2, 2)));

  sphere.material = sphereMat;

  const addInterpolateValueActionToggle = doAddInterpolateValueAction(
    scene,
    true
  );

  addInterpolateValueActionToggle('OnPickDownTrigger')
    .at(sphere)
    .make(sphere)
    .property('diffuseColor')
    .reach(new Color3(0, 1, 0))
    .within(3000);
};
