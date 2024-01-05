import { Animations } from 'phaser';

export const createSkeletonAnims = (anims: Animations.AnimationManager) => {
  anims.create({
    key: 'skeleton-idle-down',
    frames: anims.generateFrameNames('skeleton', { start: 0, end: 3, prefix: 'skelet_idle_anim_f', suffix: '.png' }),
    frameRate: 10,
    repeat: -1
  })
  anims.create({
    key: 'skeleton-run-down',
    frames: anims.generateFrameNames('skeleton', { start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png' }),
    frameRate: 10,
    repeat: -1
  })
}