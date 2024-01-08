import { Scene } from 'phaser';
import { GameServerService } from '../services/game-server.service';

export class BootstrapScene extends Scene {

  private gameServer!: GameServerService;

  constructor() {
    super('bootstrap')
  }

  init() {
    this.gameServer = new GameServerService();
  }

  preload() {
    this.load.image('tiles', 'tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon.json');

    this.load.atlas('dzenis','character/dzenis.png', 'character/dzenis.json');
    this.load.atlas('skeleton','enemies/skeleton.png', 'enemies/skeleton.json')
    
    this.load.atlas('chest', 'items/chest.png', 'items/chest.json');
    this.load.atlas('coin', 'items/coin.png', 'items/coin.json');

    this.load.image('ui-heart-full', 'ui/ui_heart_full.png');
    this.load.image('ui-heart-empty', 'ui/ui_heart_empty.png');

    this.load.image('knife', 'weapons/weapon_knife.png');
  } 

  async create() {
    
    this.scene.launch('game', {
      gameServer: this.gameServer,
    })
  }
}