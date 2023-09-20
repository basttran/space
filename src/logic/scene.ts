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

export const runGame = async (canvas: HTMLCanvasElement) => {
  const engine = createEngine(canvas);
  const scene = await createScene(engine);
  await loadLevel(scene, engine);
  scene.onKeyboardObservable.add(doChangeScene(scene, engine));
  engine.runRenderLoop(() => {
    scene.render();
  });
};

const doChangeScene =
  (scene: Scene, engine: Engine) => async (e: KeyboardInfo) => {
    console.log('e.event.key: ', e.event.key);
    if (e.event.key === '&') {
      engine.stopRenderLoop();
      scene.dispose();
      const newScene = await createScene(engine);
      await loadLevel(newScene, engine);
      newScene.onKeyboardObservable.add(doChangeScene(newScene, engine));
      engine.runRenderLoop(() => {
        newScene.render();
      });
    }
    if (e.event.key === 'é') {
      engine.stopRenderLoop();
      scene.dispose();
      const newScene = await createScene(engine);
      await loadDemo(newScene, engine);
      newScene.onKeyboardObservable.add(doChangeScene(newScene, engine));
      engine.runRenderLoop(() => {
        newScene.render();
      });
    }
  };
