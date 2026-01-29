import Phaser from 'phaser';
import { SCENES } from '../game/constants';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PLAY });
  }

  create(): void {
    this.createPlaceholder();
  }

  private createPlaceholder(): void {
    const { width, height } = this.scale;
    const text = this.add.text(width / 2, height / 2, 'Play Scene\n(개발 중)', {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
    });
    text.setOrigin(0.5);

    const backText = this.add.text(width / 2, height - 100, 'Press ESC to return', {
      fontSize: '16px',
      color: '#888888',
    });
    backText.setOrigin(0.5);

    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENES.TITLE);
    });
  }

  update(): void {
    // 게임 로직 업데이트 (추후 구현)
  }
}
