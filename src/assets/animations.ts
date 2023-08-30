import { Animation, Mesh, Scene } from '@babylonjs/core';

export const basicAnimationExample = async (scene: Scene) => {};

type AnimationFrame = { frame: number; value: any };

export const TYPE = {
  FLOAT: 0,
  VECTOR3: 1,
  QUATERNION: 2,
  MATRIX: 3,
  COLOR3: 2,
  VECTOR2: 5,
  SIZE: 6,
  COLOR4: 7,
} as const;

export const LOOPMODE = {
  RELATIVE: 0,
  CYCLE: 1,
  CONSTANT: 2,
  YOYO: 4,
} as const;

const FPS = 60;

export const doCreateAnimationTriggerFor =
  (scene: Scene) => (propertyPath: string) => {
    return {
      of: (target: Mesh) => {
        return {
          as: (name: string) => {
            return {
              using: (
                type: keyof typeof TYPE,
                loopMode?: keyof typeof LOOPMODE
              ) => {
                return {
                  frames: (frames: AnimationFrame[]) => {
                    const animation = new Animation(
                      name,
                      propertyPath,
                      FPS,
                      TYPE[type],
                      LOOPMODE[loopMode || 'CONSTANT']
                    );
                    animation.setKeys(frames);
                    target.animations.push(animation);
                    if (frames.length) {
                      const { 0: first, [frames.length - 1]: last } = frames;
                      return () =>
                        scene.beginAnimation(
                          target,
                          first.frame,
                          last.frame,
                          loopMode !== undefined
                        );
                    }
                    return () => {};
                  },
                };
              },
            };
          },
        };
      },
    };
  };

export const createAnimation = (
  scene: Scene,
  name: string,
  target: Mesh,
  propertyPath: string,
  animationFrames: AnimationFrame[],
  valueType: number,
  loopType: number
) => {
  const frames = [];
  const animation = new Animation(name, propertyPath, FPS, valueType, loopType);
  frames.push(...animationFrames);
  animation.setKeys(frames);

  target.animations.push(animation);
  scene.beginAnimation(target, 0, 180, true);
};
