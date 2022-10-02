import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { IPostDocument } from '@post/interfaces/post.interface';


export class Create {
    public async post(req: Request, res: Response): Promise<void> {
      const {post, bgColor, privacy, gifUrl, profilePicture, feelings} = req.body;

      const postObjectId: ObjectId = new ObjectId();
      const createPost: IPostDocument = {
        _id: postObjectId,
        userId: req.currentUser!.userId,
        username: req.currentUser!.username,
        email: req.currentUser!.email,
        avatarColor: req.currentUser!.avatarColor,
        profilePicture,
        post,
        bgColor,
        feelings,
        privacy,
        gifUrl,
        commentsCount: 0,
        imgVersion: '',
        imgId: '',
        createdAt: new Date(),
        reactions: {like: 0, love: 0, sad: 0, wow: 0, angry: 0, haha: 0}

      } as IPostDocument;

      res.status(HTTP_STATUS.CREATED).json({ message: 'Post created successfully'});
    }
}


