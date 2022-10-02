import { authMiddleware } from '@global/helpers/auth-middleware';
import { Create } from '@post/controllers/create-post';
import express, { Router } from 'express';

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {

    this.router.post('/post', authMiddleware.checkAuthentication, Create.prototype.post);
    this.router.post('/post/image/post', authMiddleware.checkAuthentication, Create.prototype.postWithImage);

    return this.router;
  }
}

export const postRoutes: PostRoutes = new PostRoutes();
