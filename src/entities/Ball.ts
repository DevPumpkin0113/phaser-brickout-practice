import Phaser from 'phaser';
import { BALL } from '../game/constants';

export class Ball extends Phaser.GameObjects.Arc {
  private isLaunched: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, BALL.RADIUS, 0, 360, false, BALL.COLOR);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCircle(BALL.RADIUS);
    body.setCollideWorldBounds(true);
    body.setBounce(1, 1);

    this.setupWorldBoundsEvent();
  }

  private setupWorldBoundsEvent(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.onWorldBounds = true;
  }

  launch(): void {
    if (this.isLaunched) return;

    this.isLaunched = true;
    const body = this.body as Phaser.Physics.Arcade.Body;

    // 랜덤 각도로 발사 (-45도 ~ -135도, 위쪽 방향)
    const angle = Phaser.Math.Between(-135, -45);
    const velocity = this.scene.physics.velocityFromAngle(angle, BALL.SPEED);
    body.setVelocity(velocity.x, velocity.y);
  }

  reset(x: number, y: number): void {
    this.isLaunched = false;
    this.setPosition(x, y);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
  }

  bounceOffPaddle(paddle: Phaser.GameObjects.GameObject): void {
    const paddleBody = paddle.body as Phaser.Physics.Arcade.Body;
    const ballBody = this.body as Phaser.Physics.Arcade.Body;

    // 패들 중심에서 공의 위치 비율 계산 (-1 ~ 1)
    const paddleCenterX = paddleBody.center.x;
    const hitPosition = (this.x - paddleCenterX) / (paddleBody.halfWidth);
    const clampedHit = Phaser.Math.Clamp(hitPosition, -1, 1);

    // 반사 각도 계산 (중앙: 수직, 가장자리: 최대 각도)
    const angle = -90 + clampedHit * BALL.MAX_ANGLE;
    const velocity = this.scene.physics.velocityFromAngle(angle, BALL.SPEED);

    ballBody.setVelocity(velocity.x, velocity.y);
  }

  getIsLaunched(): boolean {
    return this.isLaunched;
  }
}
