import Phaser from 'phaser';
import { SCENES, PADDLE } from '../game/constants';
import { Paddle } from '../entities/Paddle';

export class PlayScene extends Phaser.Scene {
  private paddle!: Paddle;

  constructor() {
    super({ key: SCENES.PLAY });
  }

  create(): void {
    this.createPaddle();
    this.setupInput();
  }

  private createPaddle(): void {
    const { width, height } = this.scale;
    const paddleX = width / 2;
    const paddleY = height - PADDLE.BOTTOM_OFFSET;

    this.paddle = new Paddle(this, paddleX, paddleY);
  }

  private setupInput(): void {
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENES.TITLE);
    });
  }

  update(): void {
    this.paddle.update();
  }
}
