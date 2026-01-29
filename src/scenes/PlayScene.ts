import Phaser from 'phaser';
import { SCENES, PADDLE, BALL, BRICK } from '../game/constants';
import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';
import { Brick } from '../entities/Brick';

export class PlayScene extends Phaser.Scene {
  private paddle!: Paddle;
  private ball!: Ball;
  private bricks!: Phaser.GameObjects.Group;
  private canLaunch: boolean = false;

  constructor() {
    super({ key: SCENES.PLAY });
  }

  create(): void {
    this.canLaunch = false;
    this.createBricks();
    this.createPaddle();
    this.createBall();
    this.setupCollisions();
    this.setupInput();

    // 씬 시작 후 잠시 대기 후 발사 가능
    this.time.delayedCall(200, () => {
      this.canLaunch = true;
    });
  }

  private createBricks(): void {
    this.bricks = this.add.group();

    const { width } = this.scale;
    const totalWidth = BRICK.COLS * (BRICK.WIDTH + BRICK.PADDING) - BRICK.PADDING;
    const startX = (width - totalWidth) / 2 + BRICK.WIDTH / 2;

    for (let row = 0; row < BRICK.ROWS; row++) {
      const color = BRICK.COLORS[row % BRICK.COLORS.length];

      for (let col = 0; col < BRICK.COLS; col++) {
        const x = startX + col * (BRICK.WIDTH + BRICK.PADDING);
        const y = BRICK.TOP_OFFSET + row * (BRICK.HEIGHT + BRICK.PADDING);

        const brick = new Brick(this, x, y, color);
        this.bricks.add(brick);
      }
    }
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

    // 벽돌-공 충돌
    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.handleBallBrickCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    // 바닥 충돌 감지
    this.physics.world.on('worldbounds', this.handleWorldBounds, this);
  }

  private shouldCollide(): boolean {
    return this.ball.getIsLaunched();
  }

  private handleBallPaddleCollision(): void {
    this.ball.bounceOffPaddle(this.paddle);
  }

  private handleBallBrickCollision(
    _ball: Phaser.GameObjects.GameObject,
    brick: Phaser.GameObjects.GameObject
  ): void {
    brick.destroy();
  }

  private handleWorldBounds(
    body: Phaser.Physics.Arcade.Body,
    _up: boolean,
    down: boolean
  ): void {
    if (body.gameObject === this.ball && down) {
      this.resetBall();
    }
  }

  private resetBall(): void {
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

    this.input.on('pointerup', () => {
      this.launchBall();
    });

    this.input.keyboard?.on('keydown-SPACE', () => {
      this.launchBall();
    });
  }

  update(): void {
    this.paddle.update();

    if (!this.ball.getIsLaunched()) {
      this.ball.setX(this.paddle.x);
    }
  }
}
