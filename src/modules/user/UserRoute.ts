import { Request, Response, Router } from "express";
import { UserController } from "./UserController";

export class UserRoutes {
  private controller: UserController;
  private router: Router;
  constructor() {
    this.controller = new UserController();
    this.router = Router();
  }
  public routes() {
    this.router.get("/info", (req: Request, res: Response) =>
      this.controller.getInfo(req, res)
    );

    return this.router;
  }
}
