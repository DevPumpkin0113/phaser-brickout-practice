import Phaser from 'phaser';
import { StageData } from '../types';
import { Brick } from '../entities/Brick';
import { BRICK } from '../game/constants';
import { getStageData } from '../data/stages';

export class StageLoader {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * 스테이지 데이터를 로드하여 벽돌 그룹 생성
   * @param stageNumber 스테이지 번호
   * @param bricksGroup 벽돌을 추가할 그룹
   * @returns 로드된 스테이지 데이터
   */
  loadStage(stageNumber: number, bricksGroup: Phaser.GameObjects.Group): StageData {
    const stageData = getStageData(stageNumber);

    // 기존 벽돌 제거
    bricksGroup.clear(true, true);

    // 화면 중앙 정렬을 위한 시작 X 좌표 계산
    const { width } = this.scene.scale;
    const totalWidth = BRICK.COLS * (BRICK.WIDTH + BRICK.PADDING) - BRICK.PADDING;
    const startX = (width - totalWidth) / 2 + BRICK.WIDTH / 2;

    // 스테이지 데이터에 따라 벽돌 생성
    stageData.bricks.forEach((brickData) => {
      const x = startX + brickData.col * (BRICK.WIDTH + BRICK.PADDING);
      const y = BRICK.TOP_OFFSET + brickData.row * (BRICK.HEIGHT + BRICK.PADDING);

      const brick = new Brick(this.scene, x, y, brickData.type);
      bricksGroup.add(brick);
    });

    return stageData;
  }

  /**
   * 특정 스테이지의 클리어 보너스 점수 반환
   * @param stageNumber 스테이지 번호
   * @returns 클리어 보너스 점수
   */
  getClearBonus(stageNumber: number): number {
    const stageData = getStageData(stageNumber);
    return stageData.clearBonus;
  }

  /**
   * 특정 스테이지의 공 속도 반환
   * @param stageNumber 스테이지 번호
   * @returns 공 속도
   */
  getBallSpeed(stageNumber: number): number {
    const stageData = getStageData(stageNumber);
    return stageData.ballSpeed;
  }
}
