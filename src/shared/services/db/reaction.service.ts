import { UserCache } from '@service/redis/user.cache';
import { IReactionJob } from '@reaction/interfaces/reaction.interface';
import { ReactionModel } from '@reaction/models/reaction.schema';
import { PostModel } from '@post/models/post.schema';


const userCache: UserCache = new UserCache();

class ReactionService {

  public async addReactionDataToDB(reactionData: IReactionJob): Promise<void> {
    const {postId, userTo, userFrom, username, type, previousReaction, reactionObject } = reactionData;

    const updatedReaction = await Promise.all([
      userCache.getUserFromCache(`${userTo}`),
      ReactionModel.replaceOne({ postId, type: previousReaction, username }, reactionObject, { upsert: true}),
      PostModel.findOneAndUpdate(
        { _id: postId},
        {
          $inc: {
            [`reactions.${previousReaction}`]: -1,
            [`reactions.${type}`]: 1,
          }
        },
        {new: true}
      )

    ]);
  }
}

export const reactionService: ReactionService = new ReactionService();
