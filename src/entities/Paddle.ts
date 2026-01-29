import Phaser from 'phaser';
import { PADDLE } from '../game/constants';

export class Paddle extends Phaser.GameObjects.Container {
  private graphics: Phaser.GameObjects.Graphics;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private readonly paddleSpeed: number = PADDLE.SPEED;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.graphics = scene.add.graphics();
    this.drawPaddle();
    this.add(this.graphics);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(PADDLE.WIDTH, PADDLE.HEIGHT);
    body.setOffset(-PADDLE.WIDTH / 2, -PADDLE.HEIGHT / 2);
    body.setImmovable(true);
    body.setCollideWorldBounds(true);

    this.setupInput();
  }

  private drawPaddle(): void {
    this.graphics.clear();
    this.graphics.fillStyle(PADDLE.COLOR, 1);
    this.graphics.fillRoundedRect(
      -PADDLE.WIDTH / 2,
      -PADDLE.HEIGHT / 2,
      PADDLE.WIDTH,
      PADDLE.HEIGHT,
      PADDLE.RADIUS
    );
  }

  private setupInput(): void {
    this.cursors = this.scene.input.keyboard?.createCursorKeys() ?? null;
  }

  update(): void {
    this.handleKeyboardInput();
    this.handleMouseInput();
  }

  private handleKeyboardInput(): void {
    if (!this.cursors) return;

    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.left.isDown) {
      body.setVelocityX(-this.paddleSpeed);
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(this.paddleSpeed);
    } else {
      body.setVelocityX(0);
    }
  }

  private handleMouseInput(): void {
    const pointer = this.scene.input.activePointer;

    if (pointer.isDown) {
      const targetX = pointer.x;
      const body = this.body as Phaser.Physics.Arcade.Body;
      const minX = PADDLE.WIDTH / 2;
      const maxX = this.scene.scale.width - PADDLE.WIDTH / 2;

      const clampedX = Phaser.Math.Clamp(targetX, minX, maxX);
      this.x = clampedX;
      body.setVelocityX(0);
    }
  }
}
