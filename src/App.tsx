import { useEffect } from 'react';
import './App.css';
import { runGame } from './logic/scene';
import { getCanvas } from './display/html';

const App = () => {
  useEffect(() => {
    const canvas = getCanvas();
    if (canvas) {
      runGame(canvas);
    }
  });

  return (
    <main>
      <canvas id='game'></canvas>
    </main>
  );
};

export default App;
