import { Animation, Mesh, Scene } from "@babylonjs/core";

export const basicAnimationExample = async (scene: Scene) => {};

type AnimationFrame = { frame: number; value: any };

export const createAnimation = (
  scene: Scene,
  name: string,
  target: Mesh,
  propertyPath: string,
  animationFrames: AnimationFrame[],
  valueType: number,
  cycleType: number
) => {
  const frames = [];
  const fps = 60;
  const animation = new Animation(
    name,
    propertyPath,
    fps,
    valueType,
    cycleType
  );
  frames.push(...animationFrames);
  frames.push();
  animation.setKeys(frames);

  target.animations.push(animation);
  scene.beginAnimation(target, 0, 180, true);
};
