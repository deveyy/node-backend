import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ShowreelCache } from '@service/redis/showreel.cache';
import { showreelSchema } from '@showreel/schemas/showreel';
import { IShowreelDocument } from '@showreel/interfaces/showreel.interface';
import { socketIOShowreelObject } from '@socket/showreel';
import { showreelQueue } from '@service/queues/showreel.queue';

const showreelCache: ShowreelCache = new ShowreelCache();

export class Create {
  @joiValidation(showreelSchema)
  public async showreel(req: Request, res: Response): Promise<void> {
    const {title , timeline, description, url }  = req.body;
    const showreelObjectId: ObjectId = new ObjectId();
    const createdShowreel: IShowreelDocument = {
      _id: showreelObjectId,
      userId: req.currentUser!.userId,
      username: req.currentUser!.username,
      title,
      timeline,
      description,
      url,
      createdAt: new Date(),
    } as IShowreelDocument;
    socketIOShowreelObject.emit('add showreel', createdShowreel);
    await showreelCache.saveShowreelToCache({
      key: showreelObjectId,
      currentUserId: `${req.currentUser!.userId}`,
      uId: `${req.currentUser!.uId}`,
      createdShowreel
    });
    showreelQueue.addShowreelJob('addShowreelToDB', {key: req.currentUser!.userId, value: createdShowreel});
    res.status(HTTP_STATUS.CREATED).json({ message: 'Showreel created successfully' });
  }
}
