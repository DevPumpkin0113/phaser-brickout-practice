import Phaser from 'phaser';
import { PADDLE } from '../game/constants';

export class HUD {
  private scene: Phaser.Scene;
  private scoreText!: Phaser.GameObjects.Text;
  private stageText!: Phaser.GameObjects.Text;
  private hearts: Phaser.GameObjects.Text[] = [];
  private pauseButton!: Phaser.GameObjects.Text;
  private onPauseClick?: () => void;

  constructor(scene: Phaser.Scene, onPauseClick?: () => void) {
    this.scene = scene;
    this.onPauseClick = onPauseClick;
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;

    // 점수 표시 (좌측 상단)
    this.scoreText = this.scene.add.text(20, 20, 'SCORE: 0', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
    });

    // 스테이지 표시 (중앙 상단)
    this.stageText = this.scene.add.text(width / 2, 20, 'STAGE 1', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.stageText.setOrigin(0.5, 0);

    // 일시정지 버튼 (우측 상단)
    this.pauseButton = this.scene.add.text(width - 20, 20, '⏸', {
      fontSize: '28px',
      color: '#ffffff',
    });
    this.pauseButton.setOrigin(1, 0);
    this.pauseButton.setInteractive({ useHandCursor: true });
    this.pauseButton.on('pointerdown', () => {
      if (this.onPauseClick) {
        this.onPauseClick();
      }
    });

    // 하트 (하단 중앙)
    this.createHearts(3);
  }

  private createHearts(count: number): void {
    const { width, height } = this.scene.scale;
    const heartY = height - PADDLE.BOTTOM_OFFSET + 40;
    const spacing = 30;
    const startX = width / 2 - ((count - 1) * spacing) / 2;

    // 기존 하트 제거
    this.hearts.forEach((heart) => heart.destroy());
    this.hearts = [];

    // 새로운 하트 생성
    for (let i = 0; i < count; i++) {
      const heart = this.scene.add.text(startX + i * spacing, heartY, '❤', {
        fontSize: '24px',
        color: '#e94560',
      });
      heart.setOrigin(0.5);
      this.hearts.push(heart);
    }
  }

  updateScore(score: number): void {
    this.scoreText.setText(`SCORE: ${score}`);
  }

  updateLives(lives: number): void {
    this.createHearts(lives);
  }

  updateStage(stage: number): void {
    this.stageText.setText(`STAGE ${stage}`);
  }

  destroy(): void {
    this.scoreText.destroy();
    this.stageText.destroy();
    this.pauseButton.destroy();
    this.hearts.forEach((heart) => heart.destroy());
  }
}
