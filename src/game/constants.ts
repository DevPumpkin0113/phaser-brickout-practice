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
  MAX_ANGLE: 60, // 패들 반사 최대 각도 (도)
} as const;
