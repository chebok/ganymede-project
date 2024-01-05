import { Scene, Tilemaps, Display } from 'phaser';

export const debugDraw = (layer: Tilemaps.TilemapLayer, scene: Scene) => {
  const debugGraphics = scene.add.graphics().setAlpha(0.7);
  layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255),
      faceColor: new Display.Color(40,39, 37, 255)
    });
}