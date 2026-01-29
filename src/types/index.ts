// 게임 상태
export enum GameState {
  READY = 'READY', // 공 발사 대기
  PLAYING = 'PLAYING', // 게임 진행 중
  PAUSE = 'PAUSE', // 일시정지
  STAGE_CLEAR = 'STAGE_CLEAR', // 스테이지 클리어
  GAME_OVER = 'GAME_OVER', // 게임 오버
}

// 게임 데이터 인터페이스
export interface GameData {
  score: number;
  lives: number;
  stage: number;
}

// 벽돌 타입
export enum BrickType {
  NORMAL = 'NORMAL', // 일반 벽돌 (1회 충돌)
  STRONG = 'STRONG', // 강화 벽돌 (2~3회 충돌)
  UNBREAKABLE = 'UNBREAKABLE', // 무적 벽돌 (파괴 불가)
  ITEM = 'ITEM', // 아이템 벽돌 (아이템 드롭)
}

// 벽돌 설정
export interface BrickConfig {
  type: BrickType;
  health: number; // 내구도 (충돌 횟수)
  color: number;
  points: number; // 파괴 시 점수
}

// 스테이지 벽돌 데이터
export interface StageBrickData {
  row: number;
  col: number;
  type: BrickType;
}

// 스테이지 데이터
export interface StageData {
  stage: number;
  bricks: StageBrickData[]; // 벽돌 배치
  ballSpeed: number; // 공 속도
  clearBonus: number; // 클리어 보너스
}
