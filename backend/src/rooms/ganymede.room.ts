import { Room, Client } from '@colyseus/core';
import { GanymedeState } from './schema/ganymede.state';

export class GanymedeRoom extends Room<GanymedeState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new GanymedeState());

    this.onMessage('type', (client, message) => {
      //
      // handle "type" message
      //
    });

    this.onMessage('keydown', (client, message) => {
      this.broadcast('keydown', message, {
        except: client,
      });
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
