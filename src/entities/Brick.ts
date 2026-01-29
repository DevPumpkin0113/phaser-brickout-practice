import Phaser from 'phaser';
import { BRICK, BRICK_TYPES } from '../game/constants';
import { BrickType } from '../types';

export class Brick extends Phaser.GameObjects.Rectangle {
  private brickType: BrickType;
  private maxHealth: number;
  private currentHealth: number;
  private points: number;

  constructor(scene: Phaser.Scene, x: number, y: number, type: BrickType = BrickType.NORMAL) {
    const config = BRICK_TYPES[type];
    super(scene, x, y, BRICK.WIDTH, BRICK.HEIGHT, config.color);

    this.brickType = type;
    this.maxHealth = config.health;
    this.currentHealth = config.health;
    this.points = config.points;

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(BRICK.WIDTH, BRICK.HEIGHT);
  }

  /**
   * 벽돌 충돌 처리
   * @returns 벽돌이 파괴되었는지 여부
   */
  hit(): boolean {
    // 무적 벽돌은 데미지를 받지 않음
    if (this.brickType === BrickType.UNBREAKABLE) {
      return false;
    }

    this.currentHealth -= 1;

    // 강화 벽돌의 경우 체력에 따라 색상 변경
    if (this.brickType === BrickType.STRONG && this.currentHealth > 0) {
      this.updateColor();
    }

    return this.currentHealth <= 0;
  }

  /**
   * 체력에 따라 색상 업데이트 (강화 벽돌용)
   */
  private updateColor(): void {
    const healthRatio = this.currentHealth / this.maxHealth;
    const baseColor = BRICK_TYPES[this.brickType].color;

    // 체력이 낮을수록 어두워짐
    const darkenFactor = 0.5 + (healthRatio * 0.5);
    const r = Math.floor(((baseColor >> 16) & 0xff) * darkenFactor);
    const g = Math.floor(((baseColor >> 8) & 0xff) * darkenFactor);
    const b = Math.floor((baseColor & 0xff) * darkenFactor);

    this.setFillStyle((r << 16) | (g << 8) | b);
  }

  /**
   * 벽돌 타입 반환
   */
  getType(): BrickType {
    return this.brickType;
  }

  /**
   * 벽돌 파괴 시 획득 점수
   */
  getPoints(): number {
    return this.points;
  }

  /**
   * 현재 체력
   */
  getHealth(): number {
    return this.currentHealth;
  }

  /**
   * 벽돌이 파괴 가능한지 여부
   */
  isDestructible(): boolean {
    return this.brickType !== BrickType.UNBREAKABLE;
  }

  destroy(): void {
    super.destroy();
  }
}
