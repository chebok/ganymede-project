import { MapSchema, Schema, type } from '@colyseus/schema';
import { Player } from '../../entities/character.entity';

export class WorldState extends Schema {
  @type('number') width: number;
  @type('number') height: number;
  @type('number') items: number = 10;
  @type({ map: Player }) players = new MapSchema<Player>();
}
