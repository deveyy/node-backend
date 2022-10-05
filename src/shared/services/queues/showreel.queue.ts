import { BaseQueue } from '@service/queues/base.queue';
import { IShowreelJobData } from '@showreel/interfaces/showreel.interface';
import { showreelWorker } from '@worker/showreel.worker';

class ShowreelQueue extends BaseQueue {
  constructor() {
    super('showreel');
    this.processJob('addShowreelToDB', 5, showreelWorker.saveShowreelToDB);
    this.processJob('deleteShowreelFromDB', 5, showreelWorker.deleteShowreelFromDB);
    this.processJob('updateShowreelInDB', 5, showreelWorker.updateShowreelInDB);
  }

  public addShowreelJob(name: string, data: IShowreelJobData): void {
    this.addJob(name, data);
  }
}

export const showreelQueue: ShowreelQueue = new ShowreelQueue();
