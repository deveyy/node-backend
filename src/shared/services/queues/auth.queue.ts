import { IAuthJob } from '@auth/interfaces/auth.interface';
import { authWorker } from '@root/shared/workers/auth.worker';
import { BaseQueue } from '@service/queues/base.queue';

class AuthQueue extends BaseQueue {
  constructor() {
    super('auth');
    this.processJob('addAuthUserToDB', 5, authWorker.addAuthUserToDB);
  }

  public addAuthUserJob(name: string, data: IAuthJob): void {
    this.addJob(name, data);
  }
}

export const authQueue: AuthQueue = new AuthQueue();
