import Phaser from 'phaser';
// import { MainMenuScene } from './scenes/MainMenuScene';
// import { GameScene } from './scenes/GameScene';
// import { GameOverScene } from './scenes/GameOverScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [/* MainMenuScene, GameScene, GameOverScene */],
};
