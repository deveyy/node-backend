import { IPostJobData } from '@post/interfaces/post.interface';
import { postWorker } from '@root/shared/workers/post.worker';
import { BaseQueue } from '@service/queues/base.queue';

class PostQueue extends BaseQueue {
  constructor() {
    super('posts');
    this.processJob('addPostToDB', 5, postWorker.savePostToDB);
    this.processJob('deletePostFromDB', 5, postWorker.deletePostFromDB);
  }

  public addPostJob(name: string, data: IPostJobData): void {
    this.addJob(name, data);
  }
}

export const postQueue: PostQueue = new PostQueue();
