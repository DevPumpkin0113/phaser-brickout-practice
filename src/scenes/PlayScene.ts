import Phaser from 'phaser';
import { SCENES, PADDLE, BALL } from '../game/constants';
import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';

export class PlayScene extends Phaser.Scene {
  private paddle!: Paddle;
  private ball!: Ball;
  private canLaunch: boolean = false;

  constructor() {
    super({ key: SCENES.PLAY });
  }

  create(): void {
    this.canLaunch = false;
    this.createPaddle();
    this.createBall();
    this.setupCollisions();
    this.setupInput();

    // 씬 시작 후 잠시 대기 후 발사 가능
    this.time.delayedCall(200, () => {
      this.canLaunch = true;
    });
  }

  private createPaddle(): void {
    const { width, height } = this.scale;
    const paddleX = width / 2;
    const paddleY = height - PADDLE.BOTTOM_OFFSET;

    this.paddle = new Paddle(this, paddleX, paddleY);
  }

  private createBall(): void {
    const { width, height } = this.scale;
    const ballX = width / 2;
    const ballY = height - PADDLE.BOTTOM_OFFSET - PADDLE.HEIGHT / 2 - BALL.RADIUS - 5;

    this.ball = new Ball(this, ballX, ballY);
  }

  private setupCollisions(): void {
    // 패들-공 충돌
    this.physics.add.collider(
      this.ball,
      this.paddle,
      this.handleBallPaddleCollision,
      this.shouldCollide,
      this
    );

    // 바닥 충돌 감지
    this.physics.world.on('worldbounds', this.handleWorldBounds, this);
  }

  private shouldCollide(): boolean {
    // 공이 발사된 상태에서만 충돌 처리
    return this.ball.getIsLaunched();
  }

  private handleBallPaddleCollision(): void {
    this.ball.bounceOffPaddle(this.paddle);
  }

  private handleWorldBounds(
    body: Phaser.Physics.Arcade.Body,
    _up: boolean,
    down: boolean
  ): void {
    if (body.gameObject === this.ball && down) {
      // 바닥에 닿으면 공 리셋 (추후 라이프 감소 처리)
      this.resetBall();
    }
  }

  private resetBall(): void {
    // 화면 흔들림 효과
    this.cameras.main.shake(200, 0.01);

    const { width, height } = this.scale;
    const ballX = width / 2;
    const ballY = height - PADDLE.BOTTOM_OFFSET - PADDLE.HEIGHT / 2 - BALL.RADIUS - 5;

    this.ball.reset(ballX, ballY);
  }

  private launchBall(): void {
    if (this.canLaunch && !this.ball.getIsLaunched()) {
      this.ball.launch();
    }
  }

  private setupInput(): void {
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENES.TITLE);
    });

    // 마우스/터치를 뗄 때 또는 스페이스로 공 발사
    this.input.on('pointerup', () => {
      this.launchBall();
    });

    this.input.keyboard?.on('keydown-SPACE', () => {
      this.launchBall();
    });
  }

  update(): void {
    this.paddle.update();

    // 공이 발사되지 않았으면 패들 위에 고정
    if (!this.ball.getIsLaunched()) {
      this.ball.setX(this.paddle.x);
    }
  }
}
