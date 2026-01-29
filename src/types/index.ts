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
