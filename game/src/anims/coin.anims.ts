import { Animations } from 'phaser';

export const createCoinAnims = (anims: Animations.AnimationManager) => {
  anims.create({
    key: 'chest-open',
    frames: anims.generateFrameNames('coin', { start: 0, end: 3, prefix: 'coin_anim_f', suffix: '.png' }),
    frameRate: 10,
  })
}