import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { commentNames, commentsData, reactionMockRequest, reactionMockResponse } from '@root/mocks/reactions.mock';
import { CommentCache } from '@service/redis/comment.cache';
import { Get } from '@comment/controllers/get-comments';
import { commentService } from '@service/db/comment.service';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/comment.cache');

describe('Get', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('comments', () => {
    it('should send correct json response if comments exist in cache', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getCommentsFromCache').mockResolvedValue([commentsData]);

      await Get.prototype.comments(req, res);
      expect(CommentCache.prototype.getCommentsFromCache).toHaveBeenCalledWith('633909b4f987ae6d75cb2ff3');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post comments',
        comments: [commentsData]
      });
    });

    it('should send correct json response if comments exist in database', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getCommentsFromCache').mockResolvedValue([]);
      jest.spyOn(commentService, 'getPostComments').mockResolvedValue([commentsData]);

      await Get.prototype.comments(req, res);
      expect(commentService.getPostComments).toHaveBeenCalledWith(
        { postId: new mongoose.Types.ObjectId('633909b4f987ae6d75cb2ff3') },
        { createdAt: -1 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post comments',
        comments: [commentsData]
      });
    });
  });

  describe('commentsNamesFromCache', () => {
    it('should send correct json response if data exist in redis', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getCommentsNamesFromCache').mockResolvedValue([commentNames]);

      await Get.prototype.commentsNamesFromCache(req, res);
      expect(CommentCache.prototype.getCommentsNamesFromCache).toHaveBeenCalledWith('633909b4f987ae6d75cb2ff3');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post comments names',
        comments: [commentNames]
      });
    });

    it('should send correct json response if data exist in database', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getCommentsNamesFromCache').mockResolvedValue([]);
      jest.spyOn(commentService, 'getPostCommentNames').mockResolvedValue([commentNames]);

      await Get.prototype.commentsNamesFromCache(req, res);
      expect(commentService.getPostCommentNames).toHaveBeenCalledWith(
        { postId: new mongoose.Types.ObjectId('633909b4f987ae6d75cb2ff3') },
        { createdAt: -1 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post comments names',
        comments: [commentNames]
      });
    });

    it('should return empty comments if data does not exist in redis and database', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getCommentsNamesFromCache').mockResolvedValue([]);
      jest.spyOn(commentService, 'getPostCommentNames').mockResolvedValue([]);

      await Get.prototype.commentsNamesFromCache(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post comments names',
        comments: []
      });
    });
  });

  describe('singleComment', () => {
    it('should send correct json response from cache', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        commentId: '633a36dafb0e212eeaec93a4',
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getSingleCommentFromCache').mockResolvedValue([commentsData]);

      await Get.prototype.singleComment(req, res);
      expect(CommentCache.prototype.getSingleCommentFromCache).toHaveBeenCalledWith('633909b4f987ae6d75cb2ff3', '633a36dafb0e212eeaec93a4');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Single comment',
        comments: commentsData
      });
    });

    it('should send correct json response from database', async () => {
      const req: Request = reactionMockRequest({}, {}, authUserPayload, {
        commentId: '633a36dafb0e212eeaec93a4',
        postId: '633909b4f987ae6d75cb2ff3'
      }) as Request;
      const res: Response = reactionMockResponse();
      jest.spyOn(CommentCache.prototype, 'getSingleCommentFromCache').mockResolvedValue([]);
      jest.spyOn(commentService, 'getPostComments').mockResolvedValue([commentsData]);

      await Get.prototype.singleComment(req, res);
      expect(commentService.getPostComments).toHaveBeenCalledWith(
        { _id: new mongoose.Types.ObjectId('633a36dafb0e212eeaec93a4') },
        { createdAt: -1 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Single comment',
        comments: commentsData
      });
    });
  });
});
