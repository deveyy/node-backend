import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Create } from '@showreel/controllers/create-showreel';
import { Get } from '@showreel/controllers/get-showreel';


class ShowreelRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {

    this.router.get('/showreel/all/:page', authMiddleware.checkAuthentication, Get.prototype.showreels);

    this.router.post('/showreel', authMiddleware.checkAuthentication, Create.prototype.showreel);

    return this.router;
  }
}

export const showreelRoutes: ShowreelRoutes = new ShowreelRoutes();
