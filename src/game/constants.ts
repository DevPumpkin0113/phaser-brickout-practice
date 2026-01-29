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
