import { Schema, Context, type } from '@colyseus/schema';
import { WorldState } from './world.state';

export class GanymedeState extends Schema {
  @type('number') playersCount: number;
  @type(WorldState) world: WorldState = new WorldState();
}
