import { IPostDocument } from '@post/interfaces/post.interface';
import { IReactionDocument, IReactionJob } from '@reaction/interfaces/reaction.interface';
import { UserCache } from '@service/redis/user.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import { omit } from 'lodash';
import { ReactionModel } from '@reaction/models/reaction.schema';
import { PostModel } from '@post/models/post.schema';

const userCache: UserCache = new UserCache();

class ReactionService {
  public async addReactionDataToDB(reactionData: IReactionJob): Promise<void> {
    const { postId, userTo, userFrom, username, type, previousReaction, reactionObject} = reactionData;
    const updatedReaction: [IUserDocument, IReactionDocument, IPostDocument] = await Promise.all([
      userCache.getUserFromCache(`${userTo}`),
      ReactionModel.replaceOne({ postId, type: previousReaction, username }, reactionObject, { upsert: true }),
      PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: {
            [`reactions.${previousReaction}`]: -1,
            [`reactions.${type}`]: 1
          }
        },
        { new: true }
      )
    ]) as unknown as [IUserDocument, IReactionDocument, IPostDocument];

    // send reactions notification
  }
}

export const reactionService: ReactionService = new ReactionService();
