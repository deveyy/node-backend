import { Job, DoneCallback } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { showreelService } from '@service/db/showreel.service';

const log: Logger = config.createLogger('showreelWorker');

class ShowreelWorker {
  async saveShowreelToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { data } = job;
      await showreelService.addPostToDB(data);
      job.progress(100);
      done(null, data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deleteShowreelFromDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { data } = job;
      await showreelService.deleteShowreel(data);
      job.progress(100);
      done(null, data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updateShowreelInDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await showreelService.editShowreel(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

}
export const showreelWorker: ShowreelWorker = new ShowreelWorker();
