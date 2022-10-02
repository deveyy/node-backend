import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ReactionCache } from '@service/redis/reaction.cache';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { addReactionSchema } from '@reaction/schemas/reaction';
import { IReactionDocument } from '@reaction/interfaces/reaction.interface';


const reactionCache: ReactionCache = new ReactionCache();

export class Add {

  @joiValidation(addReactionSchema)
  public async reaction(req: Request, res: Response): Promise<void> {
    const { userTo, postId, type, previousReaction, postReactions, profilePicture } = req.body;
    const reactionObject: IReactionDocument = {
      _id: new ObjectId(),
      postId,
      type,
      avataColor: req.currentUser!.avatarColor,
      username: req.currentUser!.username,
      profilePicture
    } as IReactionDocument;

    await reactionCache.savePostReactionToCache(postId, reactionObject, postReactions, type, previousReaction);

    res.status(HTTP_STATUS.OK).json({ message: 'Reaction added successfully' });
  }
}
