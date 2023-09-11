import { Color3 } from '@babylonjs/core';

const BOX_COLOR_RED = { name: new Color3(1, 0, 0), uvScale: 4 };
const BOX_COLOR_GREEN = { name: new Color3(0, 1, 0), uvScale: 4 };
const BOX_COLOR_BLUE = { name: new Color3(0, 0, 1), uvScale: 4 };

export const colorFromPosition = (x: number, y: number) => {
  if (x % 3 === 0 && y % 3 === 0) {
    return BOX_COLOR_RED;
  }
  if (x % 2 === 0 && y % 2 === 0) {
    return BOX_COLOR_GREEN;
  }
  return BOX_COLOR_BLUE;
};
