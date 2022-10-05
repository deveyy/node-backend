
import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { config } from '@root/config';
import { ISaveShowreelToCache } from '@showreel/interfaces/showreel.interface';
import { ServerError } from '@global/helpers/error-handler';

const log: Logger = config.createLogger('showreelCache');

export class ShowreelCache extends BaseCache {

  constructor() {
    super('showreelCache');
  }

  public async saveShowreelToCache(data: ISaveShowreelToCache): Promise<void> {
    const { key, currentUserId, uId, createdShowreel } = data;

    const {
      _id,
      userId,
      username,
      title,
      timeline,
      description,
      url,
      privacy,
      createdAt
    } = createdShowreel;

    const list: string[] = [
      '_id',
      `${_id}`,
      'userId',
      `${userId}`,
      'username',
      `${username}`,
      'title',
      `${title}`,
      'timeline',
      `${timeline}`,
      'description',
      `${description}`,
      'url',
      `${url}`,
      'timeline',
      `${privacy}`,
      'privacy',
      `${privacy}`,
      'createdAt',
      `${createdAt}`,
    ];
    const dataToSave: string[] = [...list];

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const showreelCount: string[] = await this.client.HMGET(`users:${currentUserId}`, 'showreelCount');
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      await this.client.ZADD('showreel', { score: parseInt(uId, 10), value: `${key}` });
      multi.HSET(`showreel:${key}`, dataToSave);
      const count: number = parseInt(showreelCount[0], 10) + 1;
      multi.HSET(`users:${currentUserId}`, ['showreelCount', count]);
      multi.exec();
    }catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }



}
