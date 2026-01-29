import Phaser from 'phaser';
import { SCENES } from '../game/constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.TITLE });
  }

  create(): void {
    this.createTitle();
    this.createStartButton();
  }

  private createTitle(): void {
    const { width, height } = this.scale;
    const title = this.add.text(width / 2, height / 3, 'BRICK\nBREAKER', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold',
      align: 'center',
    });
    title.setOrigin(0.5);
  }

  private createStartButton(): void {
    const { width, height } = this.scale;
    const button = this.add.text(width / 2, height / 2 + 100, 'TAP TO START', {
      fontSize: '24px',
      color: '#ffffff',
    });
    button.setOrigin(0.5);

    this.tweens.add({
      targets: button,
      alpha: 0.3,
      duration: 800,
      ease: 'Power2',
      yoyo: true,
      repeat: -1,
    });

    this.input.once('pointerdown', () => {
      this.scene.start(SCENES.PLAY);
    });

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start(SCENES.PLAY);
    });
  }
}
