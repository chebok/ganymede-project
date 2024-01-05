import { Math, Physics } from 'phaser';

enum ChestStateEnum {
  OPENED,
  CLOSED
}

export class Chest extends Physics.Arcade.Sprite {

  private chestState = ChestStateEnum.CLOSED;
  private _coins: number = Math.Between(50, 200);

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    
    this.anims.play('chest-closed')

  }

  open() {
    if (this.chestState !== ChestStateEnum.CLOSED) {
      return 0
    }
    this.chestState = ChestStateEnum.OPENED;
    this.anims.play('chest-open')
    return this._coins
  }
}
