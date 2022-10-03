/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Response } from 'express';
import { AuthPayload, IAuthDocument } from '@auth/interfaces/auth.interface';

export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: any) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IJWT {
  jwt?: string;
}

export interface IAuthMock {
  _id?: string;
  username?: string;
  email?: string;
  uId?: string;
  password?: string;
  avatarColor?: string;
  avatarImage?: string;
  createdAt?: Date | string;
  confirmPassword?: string;
}

export const authUserPayload: AuthPayload = {
  userId: '6339076b4153f2489a3ed50f',
  uId: '1621613119252066',
  username: 'ddthien',
  email: 'ddthien@gmail.com',
  avatarColor: '#9c27b0',
  iat: 12345
};

export const authMock = {
  _id: '6339076b4153f2489a3ed50f',
  uId: '72076739424',
  username: 'ddthien',
  email: 'ddthien@gmail.com',
  avatarColor: '#9c27b0',
  createdAt: new Date(),
  save: () => {}
} as unknown as IAuthDocument;

export const signUpMockData = {
  _id: '6339076b4153f2489a3ed50f',
  uId: '72076739424',
  username: 'ddthien',
  email: 'ddthien@gmail.com',
  avatarColor: '#ff9800',
  password: 'ddthien',
  birthDay: { month: '', day: '' },
  postCount: 0,
  gender: '',
  quotes: '',
  about: '',
  relationship: '',
  blocked: [],
  blockedBy: [],
  bgImageVersion: '',
  bgImageId: '',
  work: [],
  school: [],
  placesLived: [],
  createdAt: new Date(),
  followersCount: 0,
  followingCount: 0,
  notifications: { messages: true, reactions: true, comments: true, follows: true },
  profilePicture: 'https://res.cloudinary.com/dtnfoho5x/image/upload/v1664607788/6337e628f6f0137f40d5839b'
};
