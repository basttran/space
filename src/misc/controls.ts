import { KeyboardEventTypes, Mesh, Scene } from "@babylonjs/core";

export const addKeyboardControlsTo = (scene: Scene) => {
  return {
    for: (asset: Mesh) => {
      scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              case "q":
              case "Q":
                asset.position.x -= 0.05;
                break;
              case "d":
              case "D":
                asset.position.x += 0.05;
                break;
              case "z":
              case "Z":
                asset.position.z += 0.05;
                break;
              case "s":
              case "S":
                asset.position.z -= 0.05;
                break;
              case "e":
              case "E":
                asset.position.y += 0.05;
                break;
              case "a":
              case "A":
                asset.position.y -= 0.05;
                break;
            }
            break;
        }
      });
    },
  };
};

export const addMouseControlsTo = (scene: Scene) => {
  return {
    for: (asset: Mesh) => {
      scene.onPointerMove = (_evt, pickResult) => {
        const result = scene.pick(scene.pointerX, scene.pointerY);

        // if the click hits the ground object, we change the impact position
        if (result.hit) {
          // if (result?.pickedPoint?.x) {
          //   if (result.pickedPoint.x > 0) {
          //     asset.rotation.x += Math.PI / 90;
          //   }
          //   if (result.pickedPoint.x < 0) {
          //     asset.rotation.x -= Math.PI / 90;
          //   }
          // }
          if (result?.pickedPoint?.y) {
            if (result.pickedPoint.y > 0) {
              asset.rotation.y += Math.PI / 90;
            }
            if (result.pickedPoint.y < 0) {
              asset.rotation.y -= Math.PI / 90;
            }
          }

          // result?.pickedPoint?.x || asset.position.x;
          // asset.position.y = result?.pickedPoint?.y || asset.position.y;
        } else {
        }
      };
    },
  };
};

const memoizedPosition = (position: Position) => {
  const mouseDelta: { x: number | null; y: number | null } = {
    x: null,
    y: null,
  };
  return (mouseEvent: MouseEvent) => {
    if (!position) {
      return;
    }
    if (!mouseDelta.x || !mouseDelta.y || !mouseEvent) {
      mouseDelta.x = mouseEvent.clientX;
      mouseDelta.y = mouseEvent.clientY;
    } else {
      const deltaX = mouseEvent.clientX - mouseDelta.x;
      const deltaY = mouseEvent.clientY - mouseDelta.y;
      position.x = (position.x || 0) + deltaX * 0.01;
      position.z = (position.z || 0) + deltaY * 0.01;
      mouseDelta.x = mouseEvent.clientX;
      mouseDelta.y = mouseEvent.clientY;
    }
  };
};

type Position = { x: number; y: number; z: number };

const movebox = (box: Mesh, direction: boolean) => {
  // Check if box is moving right
  if (box.position.x < 2 && direction) {
    // Increment box position to the right
    box.position.x += 0.05;
  } else {
    // Swap directions to move left
    direction = false;
  }

  // Check if box is moving left
  if (box.position.x > -2 && !direction) {
    // Decrement box position to the left
    box.position.x -= 0.05;
  } else {
    // Swap directions to move right
    direction = true;
  }
};

const handleInputs = () => {};

const checkCollisions = () => {};

const moveCamera = () => {};
