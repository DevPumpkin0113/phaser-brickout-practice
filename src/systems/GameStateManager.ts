import { GameState, GameData } from '../types';

export class GameStateManager {
  private state: GameState;
  private data: GameData;

  constructor() {
    this.state = GameState.READY;
    this.data = {
      score: 0,
      lives: 3,
      stage: 1,
    };
  }

  getState(): GameState {
    return this.state;
  }

  setState(newState: GameState): void {
    this.state = newState;
  }

  getData(): GameData {
    return { ...this.data };
  }

  getScore(): number {
    return this.data.score;
  }

  addScore(points: number): void {
    this.data.score += points;
  }

  getLives(): number {
    return this.data.lives;
  }

  loseLife(): void {
    this.data.lives = Math.max(0, this.data.lives - 1);
  }

  getStage(): number {
    return this.data.stage;
  }

  nextStage(): void {
    this.data.stage += 1;
  }

  reset(): void {
    this.state = GameState.READY;
    this.data = {
      score: 0,
      lives: 3,
      stage: 1,
    };
  }

  isPlaying(): boolean {
    return this.state === GameState.PLAYING;
  }

  isGameOver(): boolean {
    return this.state === GameState.GAME_OVER;
  }
}
