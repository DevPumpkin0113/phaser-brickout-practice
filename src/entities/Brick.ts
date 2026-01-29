import Phaser from 'phaser';
import { BRICK } from '../game/constants';

export class Brick extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
    super(scene, x, y, BRICK.WIDTH, BRICK.HEIGHT, color);

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(BRICK.WIDTH, BRICK.HEIGHT);
  }

  destroy(): void {
    super.destroy();
  }
}
