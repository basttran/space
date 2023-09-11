import { Engine, IPointerEvent, Scene } from '@babylonjs/core';
import { showUI } from '../display/ui';
import { loadLevel } from './levels';

export const enablePointerLock = (
  scene: Scene,
  engine: Engine,
  handleLockedPointerDown: (pointerDownEvent: IPointerEvent) => void
) => {
  scene.onPointerDown = (event) => {
    if (!engine.isPointerLock && event.button === 0) {
      engine.enterPointerlock();
      showUI(event); // makes skybox disappear ??!
      return;
    }
    handleLockedPointerDown(event);
  };
};

const setupScene = async (engine: Engine) => {
  const scene = new Scene(engine);
  // await loadDemo(scene, engine);
  await loadLevel(scene, engine);
  return scene;
};

const loadGame = async (engine: Engine) => {
  const scene = await setupScene(engine);
  return scene;
};

const createEngine = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  return engine;
};

export const runGame = async (canvas: HTMLCanvasElement) => {
  const engine = createEngine(canvas);
  const scene = await loadGame(engine);
  engine.runRenderLoop(() => {
    scene.render();
  });
};
