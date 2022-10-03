import { Response } from 'express';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { IReactionDocument, IReactions } from '@reaction/interfaces/reaction.interface';
import { IJWT } from './auth.mock';
import { ICommentDocument, ICommentNameList } from '@comment/interfaces/comment.interface';

export const reactionMockRequest = (sessionData: IJWT, body: IBody, currentUser?: AuthPayload | null, params?: IParams) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const reactionMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IBody {
  postId?: string;
  comment?: string;
  profilePicture?: string;
  userTo?: string;
  type?: string;
  previousReaction?: string;
  postReactions?: IReactions;
}

export interface IParams {
  postId?: string;
  page?: string;
  commentId?: string;
  reactionId?: string;
  previousReaction?: string;
  username?: string;
  postReactions?: string;
}

export const reactionData: IReactionDocument = {
  _id: '63396995ffea3396bd0b9285',
  username: 'Ddthien',
  postId: '633909b4f987ae6d75cb2ff3',
  profilePicture: 'https://res.cloudinary.com/dtnfoho5x/image/upload/v1664607788/6337e628f6f0137f40d5839b',
  comment: 'This is a comment',
  createdAt: new Date(),
  userTo: '6339076b4153f2489a3ed50f',
  type: 'love'
} as IReactionDocument;

export const commentsData: ICommentDocument = {
  _id: '633a36dafb0e212eeaec93a4',
  username: 'Ddthien',
  avatarColor: '#9c27b0',
  postId: '633909b4f987ae6d75cb2ff3',
  profilePicture: 'https://res.cloudinary.com/dtnfoho5x/image/upload/v1664607788/6337e628f6f0137f40d5839b',
  comment: 'This is a comment',
  createdAt: new Date(),
  userTo: '6339076b4153f2489a3ed50f'
} as unknown as ICommentDocument;

export const commentNames: ICommentNameList = {
  count: 1,
  names: ['Ddthien']
};
