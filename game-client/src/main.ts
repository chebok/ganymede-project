import { AUTO, Game, Types} from 'phaser';
import { GameScene } from './scenes/game.scene';
import { GameUIScene } from './scenes/game-ui.scene';
import { BootstrapScene } from './scenes/bootstrap.scene';

const config: Types.Core.GameConfig = {
  type: AUTO,
  backgroundColor: '#125555',
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      //debug: true,
    }
  },
  scene: [BootstrapScene, GameScene, GameUIScene],
  scale: {
    zoom: 2
  }
};

const game = new Game(config);