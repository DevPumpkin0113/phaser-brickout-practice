import Phaser from 'phaser';
import { SCENES, PADDLE, BALL, BRICK, GAME, UI } from '../game/constants';
import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';
import { Brick } from '../entities/Brick';
import { GameStateManager } from '../systems/GameStateManager';
import { GameState } from '../types';
import { HUD } from '../ui/HUD';

export class PlayScene extends Phaser.Scene {
  private paddle!: Paddle;
  private ball!: Ball;
  private bricks!: Phaser.GameObjects.Group;
  private canLaunch: boolean = false;
  private gameStateManager!: GameStateManager;
  private hud!: HUD;
  private uiBarrier!: Phaser.Physics.Arcade.StaticGroup;
  private pausePopup?: Phaser.GameObjects.Container;

  constructor() {
    super({ key: SCENES.PLAY });
  }

  create(): void {
    this.canLaunch = false;

    // 게임 상태 및 UI 초기화
    this.gameStateManager = new GameStateManager();
    this.hud = new HUD(this, () => this.showPausePopup());

    this.createUIBarrier();
    this.createBricks();
    this.createPaddle();
    this.createBall();
    this.setupCollisions();
    this.setupInput();

    // 씬 시작 후 잠시 대기 후 발사 가능
    this.time.delayedCall(200, () => {
      this.canLaunch = true;
      this.gameStateManager.setState(GameState.PLAYING);
    });
  }

  private createUIBarrier(): void {
    const { width } = this.scale;

    // 상단 UI 영역 보호용 투명 벽
    this.uiBarrier = this.physics.add.staticGroup();
    const barrier = this.add.rectangle(width / 2, UI.TOP_BARRIER_HEIGHT / 2, width, UI.TOP_BARRIER_HEIGHT, 0x000000, 0);
    this.physics.add.existing(barrier, true);
    this.uiBarrier.add(barrier);
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

    // UI 영역 보호벽-공 충돌
    this.physics.add.collider(this.ball, this.uiBarrier);

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

    // 점수 추가
    this.gameStateManager.addScore(GAME.BRICK_POINTS);
    this.hud.updateScore(this.gameStateManager.getScore());

    // 모든 벽돌 파괴 시 스테이지 클리어
    if (this.bricks.getLength() === 0) {
      this.handleStageClear();
    }
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

    // 라이프 감소
    this.gameStateManager.loseLife();
    this.hud.updateLives(this.gameStateManager.getLives());

    // 게임 오버 체크
    if (this.gameStateManager.getLives() === 0) {
      this.handleGameOver();
      return;
    }

    const { width, height } = this.scale;
    const ballX = width / 2;
    const ballY = height - PADDLE.BOTTOM_OFFSET - PADDLE.HEIGHT / 2 - BALL.RADIUS - 5;

    this.ball.reset(ballX, ballY);
  }

  private handleStageClear(): void {
    this.gameStateManager.setState(GameState.STAGE_CLEAR);

    // 클리어 보너스 추가
    this.gameStateManager.addScore(GAME.STAGE_CLEAR_BONUS);
    this.hud.updateScore(this.gameStateManager.getScore());

    // 스테이지 클리어 텍스트 표시
    const { width, height } = this.scale;
    const clearText = this.add.text(width / 2, height / 2, 'STAGE CLEAR!', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    clearText.setOrigin(0.5);

    // 2초 후 다음 스테이지로 (현재는 씬 재시작)
    this.time.delayedCall(2000, () => {
      this.gameStateManager.nextStage();
      this.scene.restart();
    });
  }

  private handleGameOver(): void {
    this.gameStateManager.setState(GameState.GAME_OVER);

    const { width, height } = this.scale;
    const gameOverText = this.add.text(width / 2, height / 2, 'GAME OVER', {
      fontSize: '48px',
      color: '#e94560',
      fontStyle: 'bold',
    });
    gameOverText.setOrigin(0.5);

    const finalScoreText = this.add.text(
      width / 2,
      height / 2 + 60,
      `FINAL SCORE: ${this.gameStateManager.getScore()}`,
      {
        fontSize: '24px',
        color: '#ffffff',
      }
    );
    finalScoreText.setOrigin(0.5);

    // 3초 후 타이틀로
    this.time.delayedCall(3000, () => {
      this.scene.start(SCENES.TITLE);
    });
  }

  private showPausePopup(): void {
    if (this.pausePopup || this.gameStateManager.getState() !== GameState.PLAYING) {
      return;
    }

    // 게임 일시정지
    this.gameStateManager.setState(GameState.PAUSE);
    this.physics.pause();

    const { width, height } = this.scale;

    // 반투명 배경
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);
    overlay.setOrigin(0);

    // 일시정지 텍스트
    const pauseText = this.add.text(width / 2, height / 2 - 60, 'PAUSED', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    pauseText.setOrigin(0.5);

    // 계속하기 버튼
    const resumeButton = this.add.text(width / 2, height / 2 + 20, 'RESUME', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#16213e',
      padding: { x: 20, y: 10 },
    });
    resumeButton.setOrigin(0.5);
    resumeButton.setInteractive({ useHandCursor: true });
    resumeButton.on('pointerdown', () => this.hidePausePopup());

    // 타이틀로 버튼
    const titleButton = this.add.text(width / 2, height / 2 + 80, 'QUIT TO TITLE', {
      fontSize: '24px',
      color: '#e94560',
    });
    titleButton.setOrigin(0.5);
    titleButton.setInteractive({ useHandCursor: true });
    titleButton.on('pointerdown', () => {
      // 팝업 정리 후 타이틀로 이동
      if (this.pausePopup) {
        this.pausePopup.destroy();
        this.pausePopup = undefined;
      }
      this.physics.resume();
      this.scene.start(SCENES.TITLE);
    });

    // 컨테이너에 담기
    this.pausePopup = this.add.container(0, 0, [
      overlay,
      pauseText,
      resumeButton,
      titleButton,
    ]);
  }

  private hidePausePopup(): void {
    if (!this.pausePopup) {
      return;
    }

    // 팝업 제거
    this.pausePopup.destroy();
    this.pausePopup = undefined;

    // 게임 재개
    this.gameStateManager.setState(GameState.PLAYING);
    this.physics.resume();
  }

  private launchBall(): void {
    if (this.canLaunch && !this.ball.getIsLaunched()) {
      this.ball.launch();
    }
  }

  private setupInput(): void {
    this.input.keyboard?.on('keydown-ESC', () => {
      if (this.pausePopup) {
        this.hidePausePopup();
      } else if (this.gameStateManager.getState() === GameState.PLAYING) {
        this.showPausePopup();
      }
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
