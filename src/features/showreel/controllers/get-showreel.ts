import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { ShowreelCache } from '@service/redis/showreel.cache';
import { IShowreelDocument } from '@showreel/interfaces/showreel.interface';
import { showreelService } from '@service/db/showreel.service';


const showreelCache: ShowreelCache = new ShowreelCache();

const PAGE_SIZE = 10;

export class Get {
  public async showreels(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;

    let showreels: IShowreelDocument[] = [];
    const cacheShowreels: IShowreelDocument[] = await showreelCache.getShowreelFromCache('showreel', newSkip, limit);
    if(cacheShowreels.length) {
      showreels = cacheShowreels;
    } else {
      showreels = await showreelService.getShowreels({}, skip, limit, { createdAt: -1 });
    }
    res.status(HTTP_STATUS.OK).json({ message: 'All showreel', showreels });
  }
}
