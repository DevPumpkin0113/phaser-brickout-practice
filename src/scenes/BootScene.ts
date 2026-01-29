import Phaser from 'phaser';
import { SCENES, COLORS } from '../game/constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload(): void {
    this.createLoadingBar();
    this.loadAssets();
  }

  create(): void {
    this.scene.start(SCENES.TITLE);
  }

  private createLoadingBar(): void {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();

    progressBox.fillStyle(COLORS.PRIMARY, 0.8);
    progressBox.fillRect(centerX - 160, centerY - 25, 320, 50);

    const loadingText = this.add.text(centerX, centerY - 50, 'Loading...', {
      fontSize: '20px',
      color: '#ffffff',
    });
    loadingText.setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(COLORS.ACCENT, 1);
      progressBar.fillRect(centerX - 150, centerY - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      loadingText.destroy();
    });
  }

  private loadAssets(): void {
    // 추후 에셋 로드 추가
    // this.load.image('paddle', 'assets/images/paddle.png');
    // this.load.image('ball', 'assets/images/ball.png');
  }
}
