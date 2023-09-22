import { Engine, IPointerEvent, KeyboardInfo, Scene } from '@babylonjs/core';
import { showUI } from '../display/ui';
import { loadLevel } from './levels';
import { loadDemo } from '../levels/demo';

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

const createScene = async (engine: Engine) => {
  const scene = new Scene(engine);
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
const doChangeScene =
  (scene: Scene, engine: Engine) => async (e: KeyboardInfo) => {
    if (e.event.key === '&') {
      await load(engine, scene, loadLevel);
    }
    if (e.event.key === 'é') {
      await load(engine, scene, loadDemo);
    }
  };

export const runGame = async (canvas: HTMLCanvasElement) => {
  const engine = createEngine(canvas);
  const scene = await createScene(engine);
  await load(engine, scene, loadLevel);
};

const load = async (engine: Engine, scene: Scene, demo: Function) => {
  engine.stopRenderLoop();
  scene.dispose();
  const newScene = await createScene(engine);
  await demo(newScene, engine);
  newScene.onKeyboardObservable.add(doChangeScene(newScene, engine));
  engine.runRenderLoop(() => {
    newScene.render();
  });
};
