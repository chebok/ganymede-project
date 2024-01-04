import { Scene, Types, Physics, Math } from 'phaser'
import '../characters/dzenis';
import { debugDraw } from '../utils/debug';
import { createSkeletonAnims } from '../anims/enemy.anims';
import { createCharacterAnims } from '../anims/character.anims';
import { Skeleton } from '../enemies/skeleton';
import { Dzenis } from '../characters/dzenis';
import { sceneEvents } from '../events/event-center';
import { createChestAnims } from '../anims/chest.anims';
import { Chest } from '../items/chest';

export class GameScene extends Scene {

  private cursors!: Types.Input.Keyboard.CursorKeys;
  private dzenis!: Dzenis;

  private knives!: Phaser.Physics.Arcade.Group;
  private skeletons!: Phaser.Physics.Arcade.Group;

  private playerSkeletonCollider?: Physics.Arcade.Collider;


  constructor() {
    super('game')
  }
  
  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.scene.run('game-ui')

    createCharacterAnims(this.anims, this.textures)
    createSkeletonAnims(this.anims);
    createChestAnims(this.anims);

    const map = this.make.tilemap({
      key: 'dungeon'
    });
    const tileSet = map.addTilesetImage('dungeon', 'tiles', 16, 16);
    map.createLayer('Ground', tileSet);
    const wallsLayer = map.createLayer('Walls', tileSet);

    const chests = this.physics.add.staticGroup({
      classType: Chest
    })
    const chestLayer = map.getObjectLayer('Chests');
    chestLayer.objects.forEach((chestObj) => {
      chests.get(chestObj.x + chestObj.width * 0.5, chestObj.y - chestObj.height * 0.5, 'chest')
    })

    // const chest = this.add.sprite(64, 64, 'chest', 'chest_empty_open_anim_f0.png');
    // this.time.delayedCall(1000, () => {
    //   chest.play('chest-open')
    // })

    this.knives = this.physics.add.group({
      classType: Physics.Arcade.Image,
      maxSize: 3,
    });

    this.dzenis = this.add.dzenis(128, 128, 'dzenis');
    this.dzenis.setKnives(this.knives);

    wallsLayer.setCollisionByProperty({ collides: true });

    //debugDraw(wallsLayer, this);
    
    this.cameras.main.startFollow(this.dzenis);

    this.skeletons = this.physics.add.group({
      classType: Skeleton,
      createCallback: (go) => {
        const skeletonGo = go as Skeleton;
        skeletonGo.body.onCollide = true;
      }
    });

    const skeletonsLayer = map.getObjectLayer('Skeletons');
    skeletonsLayer.objects.forEach((skeletonObj) => {
      this.skeletons.get(skeletonObj.x + skeletonObj.width * 0.5, skeletonObj.y - skeletonObj.height * 0.5, 'skeleton')
    })
    //this.skeletons.get(256, 128, 'skeleton', 'skelet_idle_anim_f0.png');

    this.physics.add.collider(this.dzenis, wallsLayer);
    this.physics.add.collider(this.skeletons, wallsLayer);

    this.physics.add.collider(this.dzenis, chests, this.handlePlayerChestCollision, undefined, this);

    this.physics.add.collider(this.knives, wallsLayer, this.handleKnifeWallCollision, undefined, this);
    this.physics.add.collider(this.knives, this.skeletons, this.handleKnifeSkeletonCollision, undefined, this);

    this.playerSkeletonCollider = this.physics.add.collider(this.skeletons, this.dzenis, this.handlePlayerSkeletonCollision, undefined, this)
  }

  private handlePlayerChestCollision(
    obj1: Types.Physics.Arcade.GameObjectWithBody,
    obj2: Types.Physics.Arcade.GameObjectWithBody
  ) {
    const chest = obj2 as Chest;
    this.dzenis.setActiveChest(chest);
  }

  private handleKnifeSkeletonCollision(
    obj1: Types.Physics.Arcade.GameObjectWithBody,
    obj2: Types.Physics.Arcade.GameObjectWithBody
  ) {
    const knife = obj1;
    const skeleton = obj2 as Skeleton;
    this.knives.killAndHide(knife);
    this.skeletons.killAndHide(skeleton);
    skeleton.disableBody();
  }

  private handleKnifeWallCollision(
    obj1: Types.Physics.Arcade.GameObjectWithBody,
    obj2: Types.Physics.Arcade.GameObjectWithBody
  ) {
    const knife = obj1;
    this.knives.killAndHide(knife);
  }

  private handlePlayerSkeletonCollision(
    obj1: Types.Physics.Arcade.GameObjectWithBody,
    obj2: Types.Physics.Arcade.GameObjectWithBody
  ) {
    const skeleton = obj2 as Skeleton;

    const dx = this.dzenis.x - skeleton.x;
    const dy = this.dzenis.y - skeleton.y;

    const dir = new Math.Vector2(dx, dy).normalize().scale(200);
    this.dzenis.handleDamage(dir);

    sceneEvents.emit('player-health-changed', this.dzenis.health);

    if (this.dzenis.health <= 0 ) {
      this.playerSkeletonCollider?.destroy();
    }
  }

  update(time: number, delta: number): void {

    if (this.dzenis) {
      this.dzenis.update(this.cursors)
    }

  }
}