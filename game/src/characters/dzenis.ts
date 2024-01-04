import * as Phaser from 'phaser';
import { Chest } from '../items/chest';
import { sceneEvents } from '../events/event-center';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      dzenis(x: number, y: number, texture: string, frame?: string | number): Dzenis
    }
  }
}

enum HealthStateEnum {
  IDLE,
  DAMAGE,
  DEAD
}

export class Dzenis extends Phaser.Physics.Arcade.Sprite {

  private healthState = HealthStateEnum.IDLE;
  private damageTime = 0;

  private _health = 3;
  private _coins = 0;

  private knives?: Phaser.Physics.Arcade.Group;
  private activeChest? : Chest;
  

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    
    this.anims.play('dzenis-moving-left');

  }

  public get health() {
    return this._health;
  }

  setKnives(knives: Phaser.Physics.Arcade.Group) {
    this.knives = knives;
  }

  setActiveChest(chest: Chest) {
    this.activeChest = chest;
  }

  handleDamage(dir: Phaser.Math.Vector2) {

    if (this.healthState === HealthStateEnum.DAMAGE) {
      return;
    }

    this._health -= 1;

    if (this._health <= 0) {
      // TODO: die
      this.healthState = HealthStateEnum.DEAD;
      this.anims.play('dzenis-death');
      this.setVelocity(0,0);

    } else {
      this.setVelocity(dir.x, dir.y);
      this.setTint(0xff0000);

      this.healthState = HealthStateEnum.DAMAGE;
      this.damageTime = 0;

      
    }
  }

  private throwKnife() {
    if (!this.knives) {
      return;
    }
    const knife = this.knives.get(this.x, this.y, 'knife') as Phaser.Physics.Arcade.Image;
    
    if (!knife) {
      return;
    }
    const animParts = this.anims.currentAnim.key.split('-');

    const direction = animParts.at(-1);

    const vec = new Phaser.Math.Vector2(0, 0)

    switch (direction) {
      case 'up':
        vec.y = -1;
        break;
      case 'down':
        vec.y = 1;
        break;
      case 'left':
        vec.x = -1;
        break;
      case 'right':
        vec.x = 1;
        break;
      default:
        break;
    }
    
    const angle = vec.angle();
    
    knife.setActive(true);
    knife.setVisible(true);

    knife.setRotation(angle);

    knife.x += vec.x * 16;
    knife.y += vec.y * 16;
    
    knife.setVelocity(vec.x * 300, vec.y * 300);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    switch (this.healthState) {
      case HealthStateEnum.IDLE:
        
        break;
      case HealthStateEnum.DAMAGE:
        this.damageTime += delta;
        if (this.damageTime >= 250) {
          this.healthState = HealthStateEnum.IDLE;
          this.setTint(0xffffff);
          this.damageTime = 0;
        }
        break;
    
      default:
        break;
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

    //У нас есть анимации на получении damage, добавить в этот блок.
    if (
      this.healthState === HealthStateEnum.DAMAGE ||
        this.healthState === HealthStateEnum.DEAD
    ) {
      return
    }

    if (!cursors) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      if (this.activeChest) {
        const coins = this.activeChest.open();
        this._coins += coins;

        sceneEvents.emit('player-coins-changed', this._coins);
      } else {
        this.throwKnife();
      }
      
      return;
    }

    const speed = 100;
    const leftDown = cursors.left?.isDown;
    const rightDown = cursors.right?.isDown;
    const upDown = cursors.up?.isDown;
    const downDown = cursors.down?.isDown;
    if (leftDown) {
      this.anims.play('dzenis-moving-left', true);
      this.setVelocity(-speed, 0);
    } else if (rightDown) {
      this.anims.play('dzenis-moving-right', true);
      this.setVelocity(speed, 0);
    } else if (upDown) {
      this.anims.play('dzenis-moving-up', true);
      this.setVelocity(0, -speed);
    } else if (downDown) {
      this.anims.play('dzenis-moving-down', true);
      this.setVelocity(0, speed);
    } else {
      const animName = this.anims.currentAnim.key;
      //  Заменить на idle
      this.anims.play(animName, true)
      this.setVelocity(0, 0);
    }

    if (leftDown || rightDown || upDown || downDown) {
      this.activeChest = null;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'dzenis',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string, 
    frame?: string | number
  ) {
    // Вместо const был var
    const sprite = new Dzenis(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(16, 24);

    return sprite
  }
)