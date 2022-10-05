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

  public async getShowreels(query: IGetShowreelQuery, skip: number, limit: number): Promise<IShowreelDocument[]> {
    let showreelShowreel = {};
    if(query?.url) {
      showreelShowreel = { $or: [{url: {$ne: ''}}]};
    } else {
      showreelShowreel = query;
    }

    const showreel: IShowreelDocument[] = await ShowreelModel.aggregate([
      { $match: showreelShowreel},
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
