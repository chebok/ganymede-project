import { Client } from 'colyseus.js';
import { Events } from 'phaser';

const PORT = process.env.PORT || 2567;

export class GameServerService {
  private client: Client;
  private events: Events.EventEmitter;

  constructor() {

    this.client = new Client(`ws://localhost:${PORT}`);
    this.events = new Events.EventEmitter();
  }

  async join() {
    const room = await this.client.joinOrCreate('GanymedeRoom');

    room.onStateChange.once((state) => {
      this.events.emit('once-state-changed', state);
    })
  }

  onceStateChanged(cb: (state: any) => void, context?: any) {
    this.events.once('once-state-changed', cb, context)
  }
}
