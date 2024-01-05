import { GameObjects, Physics, Scene, Tilemaps, Math, Time } from 'phaser';

enum DirectionEnum {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

const randomDirection = (exclude: DirectionEnum) => {
	let newDirection = Math.Between(0, 3);
	while (newDirection === exclude) {
    newDirection = Math.Between(0, 3);
  }

	return newDirection
}

export class Skeleton extends Physics.Arcade.Sprite {
  private direction = DirectionEnum.RIGHT;
  private moveEvent: Time.TimerEvent;

  constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.anims.play('skeleton-idle-down');

    scene.physics.world.on(
      Physics.Arcade.Events.TILE_COLLIDE, 
      this.handleTileCollision,
      this
    );

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction);
      },
      loop: true,
    })
  }

  destroy(fromScene?: boolean): void {
    this.moveEvent.destroy();

    super.destroy(fromScene);
  }

  private handleTileCollision(
    go: GameObjects.GameObject,
    tile: Tilemaps.Tile
  ) {
		if (go !== this) return;
		this.direction = randomDirection(this.direction);
	}


  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    const speed = 50;
    switch (this.direction) {
      case DirectionEnum.UP:
        this.setVelocity(0, -speed)
        break;
      case DirectionEnum.DOWN:
        this.setVelocity(0, speed)
        break;
      case DirectionEnum.LEFT:
        this.setVelocity(-speed, 0)
        break;
      case DirectionEnum.RIGHT:
        this.setVelocity(speed, 0)
        break;
      default:
        break;
    }
  }
}