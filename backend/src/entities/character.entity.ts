import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  @type('number') coins: number;
}
