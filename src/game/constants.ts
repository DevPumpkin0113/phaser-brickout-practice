// 화면 설정
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

// 색상
export const COLORS = {
  BACKGROUND: 0x1a1a2e,
  PRIMARY: 0x16213e,
  ACCENT: 0xe94560,
  TEXT: 0xffffff,
} as const;

// 씬 키
export const SCENES = {
  BOOT: 'BootScene',
  TITLE: 'TitleScene',
  PLAY: 'PlayScene',
} as const;

// 패들 설정
export const PADDLE = {
  WIDTH: 100,
  HEIGHT: 8,
  COLOR: 0xffffff,
  SPEED: 500,
  BOTTOM_OFFSET: 80,
  RADIUS: 4,
} as const;

// 공 설정
export const BALL = {
  RADIUS: 8,
  COLOR: 0xffffff,
  SPEED: 400,
  MAX_ANGLE: 60,
} as const;

// 벽돌 설정
export const BRICK = {
  WIDTH: 50,
  HEIGHT: 20,
  PADDING: 4,
  TOP_OFFSET: 80,
  ROWS: 5,
  COLS: 8,
  COLORS: [0xe94560, 0xf39c12, 0x2ecc71, 0x3498db, 0x9b59b6] as readonly number[],
} as const;

// 게임 설정
export const GAME = {
  INITIAL_LIVES: 3,
  BRICK_POINTS: 10,
  STAGE_CLEAR_BONUS: 100,
} as const;

// UI 설정
export const UI = {
  TOP_BARRIER_HEIGHT: 60, // 상단 UI 영역 높이
} as const;
