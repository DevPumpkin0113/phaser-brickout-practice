import { StageData, BrickType } from '../types';
import { BRICK, GAME } from '../game/constants';

/**
 * 스테이지 1: 기본 스테이지
 * - 일반 벽돌만 사용
 * - 5행 8열 전체 배치
 */
const stage1: StageData = {
  stage: 1,
  ballSpeed: GAME.BASE_BALL_SPEED,
  clearBonus: 100,
  bricks: [],
};

// Stage 1: 전체 일반 벽돌
for (let row = 0; row < BRICK.ROWS; row++) {
  for (let col = 0; col < BRICK.COLS; col++) {
    stage1.bricks.push({
      row,
      col,
      type: BrickType.NORMAL,
    });
  }
}

/**
 * 스테이지 2: 강화 벽돌 도입
 * - 상단 2줄: 강화 벽돌
 * - 하단 3줄: 일반 벽돌
 */
const stage2: StageData = {
  stage: 2,
  ballSpeed: GAME.BASE_BALL_SPEED + GAME.BALL_SPEED_INCREMENT,
  clearBonus: 150,
  bricks: [],
};

// Stage 2: 상단 강화, 하단 일반
for (let row = 0; row < BRICK.ROWS; row++) {
  for (let col = 0; col < BRICK.COLS; col++) {
    stage2.bricks.push({
      row,
      col,
      type: row < 2 ? BrickType.STRONG : BrickType.NORMAL,
    });
  }
}

/**
 * 스테이지 3: 무적 벽돌과 혼합 패턴
 * - 중앙에 무적 벽돌 배치
 * - 강화 벽돌과 일반 벽돌 혼합
 */
const stage3: StageData = {
  stage: 3,
  ballSpeed: GAME.BASE_BALL_SPEED + GAME.BALL_SPEED_INCREMENT * 2,
  clearBonus: 200,
  bricks: [],
};

// Stage 3: 중앙 무적, 주변 혼합
for (let row = 0; row < BRICK.ROWS; row++) {
  for (let col = 0; col < BRICK.COLS; col++) {
    let type: BrickType;

    // 중앙 2열에 무적 벽돌
    if (col === 3 || col === 4) {
      type = BrickType.UNBREAKABLE;
    }
    // 상단 2줄 강화 벽돌
    else if (row < 2) {
      type = BrickType.STRONG;
    }
    // 나머지 일반 벽돌
    else {
      type = BrickType.NORMAL;
    }

    stage3.bricks.push({ row, col, type });
  }
}

/**
 * 모든 스테이지 데이터
 */
export const STAGES: StageData[] = [stage1, stage2, stage3];

/**
 * 스테이지 데이터 가져오기
 * @param stageNumber 스테이지 번호 (1부터 시작)
 * @returns 스테이지 데이터 (없으면 마지막 스테이지 반복)
 */
export function getStageData(stageNumber: number): StageData {
  const index = stageNumber - 1;

  // 정의된 스테이지보다 높으면 마지막 스테이지 반복
  if (index >= STAGES.length) {
    const lastStage = STAGES[STAGES.length - 1];
    // 마지막 스테이지를 복사하고 속도만 증가
    return {
      ...lastStage,
      stage: stageNumber,
      ballSpeed: Math.min(
        GAME.BASE_BALL_SPEED + GAME.BALL_SPEED_INCREMENT * (stageNumber - 1),
        GAME.MAX_BALL_SPEED
      ),
      clearBonus: 200 + (stageNumber - 3) * 50,
    };
  }

  return STAGES[index];
}
