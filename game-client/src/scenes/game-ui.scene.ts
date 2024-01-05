import { GameObjects, Scene, Scenes } from 'phaser';

import { sceneEvents } from '../events/event-center';

export class GameUIScene extends Scene {
  private hearts!: GameObjects.Group;
  private coinsLabel!: GameObjects.Text;

  constructor() {
    super({ key: 'game-ui'})
  }

  create() {
    this.add.image(8, 25, 'coin', 'coin_anim_f0.png');
    this.coinsLabel = this.add.text(14, 20, '0', {
      fontSize: '12'
    });
    this.hearts = this.add.group({
      classType: GameObjects.Image
    })

    this.hearts.createMultiple({
      key: 'ui-heart-full',
      setXY: { x: 10, y: 10, stepX: 16 },
      quantity: 3,
    });

    sceneEvents.on(
      'player-coins-changed',
      (coins: number) => {
        this.coinsLabel.text = coins.toLocaleString();
      }
    );

    sceneEvents.on(
      'player-health-changed',
      this.handlePlayerHealthChanged,
      this
    );

    this.events.once(Scenes.Events.SHUTDOWN, () => {
			sceneEvents.off(
        'player-health-changed', 
        this.handlePlayerHealthChanged, 
        this
      );

      sceneEvents.off(
        'player-coins-changed'
      );
		})


  }

  private handlePlayerHealthChanged(health: number) {
    this.hearts.children.each((go, idx) => {
      const heart = go as GameObjects.Image;
      if (idx < health) {
        heart.setTexture('ui-heart-full')
      } else {
        heart.setTexture('ui-heart-empty')
      }

      // Надо возвращать true чтобы итерация двигалась дальше. Очень странно
      return true;
    })
  }
}