
import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { config } from '@root/config';
import { ISaveShowreelToCache, IShowreelDocument } from '@showreel/interfaces/showreel.interface';
import { ServerError } from '@global/helpers/error-handler';
import { RedisCommandRawReply } from '@redis/client/dist/lib/commands';
import { Helpers } from '@global/helpers/helpers';

const log: Logger = config.createLogger('showreelCache');

export type ShowreelCacheMultiType = string | number | Buffer | RedisCommandRawReply[] | IShowreelDocument | IShowreelDocument[];

export class ShowreelCache extends BaseCache {

  constructor() {
    super('showreelCache');
  }

  public async saveShowreelToCache(data: ISaveShowreelToCache): Promise<void> {
    const { key, uId, createdShowreel } = data;
    const createdAt = new Date();
    const {
      _id,
      userId,
      username,
      title,
      timeline,
      description,
      url,
      privacy,
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

      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      await this.client.ZADD('showreel', { score: parseInt(uId, 10), value: `${key}` });
      multi.HSET(`showreel:${key}`, dataToSave);
      multi.exec();

    }catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getShowreelFromCache(key: string, start: number, end: number): Promise<IShowreelDocument[]> {

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const reply: string[] = await this.client.ZRANGE(key, start, end, { REV: true });
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      for(const value of reply) {
        multi.HGETALL(`showreel:${value}`);
      }
      const replies: ShowreelCacheMultiType = await multi.exec() as ShowreelCacheMultiType;
      const showreelReplies: IShowreelDocument[] = [];
      for(const showreel of replies as IShowreelDocument[]) {
        showreel.title = Helpers.parseJson(`${showreel.title }`);
        showreel.timeline = Helpers.parseJson(`${showreel.timeline }`);
        showreel.description = Helpers.parseJson(`${showreel.description }`);
        showreel.url = Helpers.parseJson(`${showreel.url }`);
        showreel.privacy = Helpers.parseJson(`${showreel.privacy }`);
        showreel.createdAt = new Date(Helpers.parseJson(`${showreel.createdAt}`)) as Date;
        showreelReplies.push(showreel);
      }
      return showreelReplies;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }

  }



}
