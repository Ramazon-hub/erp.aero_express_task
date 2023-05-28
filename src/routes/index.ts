import { Router } from "express";
import { UserRoutes } from "../modules/user/UserRoute";

import { AuthRoutes } from "../modules/auth/AuthRoute";
import { FileRoutes } from "../modules/file/FileRoute";

export class AllRoutes {
  private router: Router;
  private authRouter: AuthRoutes;
  private userRouter: UserRoutes;
  private fileRouter: FileRoutes;
  constructor() {
    this.router = Router();
    this.authRouter = new AuthRoutes();
    this.userRouter = new UserRoutes();
    this.fileRouter = new FileRoutes();
  }
  public routes() {
    this.router.use("/", this.authRouter.routes());
    this.router.use("/", this.userRouter.routes());
    this.router.use("/file", this.fileRouter.routes());
    return this.router;
  }
}
