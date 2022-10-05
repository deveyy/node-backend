import { ShowreelModel } from '@showreel/models/showreel.schema';
import { IGetShowreelQuery, IQueryComplete, IQueryDeleted, IShowreelDocument } from '@showreel/interfaces/showreel.interface';
import { Query, UpdateQuery } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';

class ShowreelService {

  public async addPostToDB(userId:string, createdShowreel: IShowreelDocument): Promise<void> {
    const showreel: Promise<IShowreelDocument> = ShowreelModel.create(createdShowreel);
    const user: UpdateQuery<IUserDocument> = UserModel.updateOne({ _id: userId });
    await Promise.all([showreel, user]);
  }

  public async getShowreels(query: IGetShowreelQuery, skip = 0, limit = 0, sort: Record<string, 1 | -1>): Promise<IShowreelDocument[]> {
    let showreelQuery= {};
    if(query?.url) {
      showreelQuery = { $or: [{url: {$ne: ''}}]};
    } else {
      showreelQuery = query;
    }

    const showreel: IShowreelDocument[] = await ShowreelModel.aggregate([
      { $match: showreelQuery},
      { $sort: sort },
      { $skip: skip},
      { $limit: limit}
    ]);
    return showreel;
  }

  public async deleteShowreel(showreelId: string): Promise<void> {
    const deleteShowreel: Query<IQueryComplete & IQueryDeleted, IShowreelDocument> = ShowreelModel.deleteOne({ _id: showreelId});
    await Promise.all([deleteShowreel]);
  }

  public async editShowreel(showreelId: string, updatedShowreel: IShowreelDocument): Promise<void> {
    const showreelUpdate: UpdateQuery<IShowreelDocument> = ShowreelModel.updateOne({_id: showreelId}, { $set: updatedShowreel});
    await Promise.all([showreelUpdate]);
  }
}

export const showreelService: ShowreelService = new ShowreelService();
