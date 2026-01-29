import Phaser from 'phaser';
import { gameConfig } from './config';

export class Game extends Phaser.Game {
	constructor() {
		super(gameConfig);
	}
}