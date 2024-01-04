import { Animations, Textures } from 'phaser';

export const createCharacterAnims = (anims: Animations.AnimationManager, textures: Textures.TextureManager) => {
  const textureDzenisMovingDown = textures.addSpriteSheetFromAtlas(
    'texture-dzenis-moving-down',
    {
        atlas: 'dzenis',
        frame: 'spr_player_front_walk.png',
        frameWidth: 64,
        frameHeight: 64,
        endFrame: -1
    }
  );
  
  const animDzenisMovingDownConfig = {
    key: 'dzenis-moving-down',
    frames: anims.generateFrameNumbers('texture-dzenis-moving-down', { start: 0, end: 5, first: 0 }),
    frameRate: 10,
    repeat: -1
  };
  anims.create(animDzenisMovingDownConfig);

  const textureDzenisMovingUp = textures.addSpriteSheetFromAtlas(
    'texture-dzenis-moving-up',
    {
        atlas: 'dzenis',
        frame: 'spr_player_back_walk.png',
        frameWidth: 64,
        frameHeight: 64,
        endFrame: -1
    }
  );
  const animDzenisMovingUpConfig = {
    key: 'dzenis-moving-up',
    frames: anims.generateFrameNumbers('texture-dzenis-moving-up', { start: 0, end: 5, first: 0 }),
    frameRate: 10,
    repeat: -1
  };
  anims.create(animDzenisMovingUpConfig);
  
  


  const textureDzenisMovingLeft = textures.addSpriteSheetFromAtlas(
    'texture-dzenis-moving-left',
    {
        atlas: 'dzenis',
        frame: 'spr_player_left_walk.png',
        frameWidth: 64,
        frameHeight: 64,
        endFrame: -1
    }
  );
  const animDzenisMovingLeftConfig = {
    key: 'dzenis-moving-left',
    frames: anims.generateFrameNumbers('texture-dzenis-moving-left', { start: 0, end: 5, first: 0 }),
    frameRate: 10,
    repeat: -1
  };
  anims.create(animDzenisMovingLeftConfig);

  const textureDzenisMovingRight = textures.addSpriteSheetFromAtlas(
    'texture-dzenis-moving-right',
    {
        atlas: 'dzenis',
        frame: 'spr_player_right_walk.png',
        frameWidth: 64,
        frameHeight: 64,
        endFrame: -1
    }
  );
  const animDzenisMovingRightConfig = {
    key: 'dzenis-moving-right',
    frames: anims.generateFrameNumbers('texture-dzenis-moving-right', { start: 0, end: 5, first: 0 }),
    frameRate: 10,
    repeat: -1
  };
  anims.create(animDzenisMovingRightConfig);

  const textureDzenisDeath = textures.addSpriteSheetFromAtlas(
    'texture-dzenis-death',
    {
        atlas: 'dzenis',
        frame: 'spr_player_death.png',
        frameWidth: 64,
        frameHeight: 64,
        endFrame: -1
    }
  );
  const animDzenisDeathConfig = {
    key: 'dzenis-death',
    frames: anims.generateFrameNumbers('texture-dzenis-death', { start: 0, end: 7, first: 0 }),
    frameRate: 10
  };
  anims.create(animDzenisDeathConfig);
}