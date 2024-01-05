import { Animations } from 'phaser';

export const createChestAnims = (anims: Animations.AnimationManager) => {
  anims.create({
    key: 'chest-open',
    frames: anims.generateFrameNames('chest', { start: 0, end: 2, prefix: 'chest_empty_open_anim_f', suffix: '.png' }),
    frameRate: 3,
  })

  anims.create({
    key: 'chest-closed',
    frames: [{ key: 'chest', frame: 'chest_empty_open_anim_f0.png' }],
    frameRate: 3,
  })
}