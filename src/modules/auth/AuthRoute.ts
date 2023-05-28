import { Request, Response, Router } from "express";
import { AuthController } from "./AuthController";

export class AuthRoutes {
  private controller: AuthController;
  private router: Router;
  constructor() {
    this.controller = new AuthController();
    this.router = Router();
  }
  public routes() {
    this.router.post("/signup", (req: Request, res: Response) =>
      this.controller.signup(req, res)
    );
    this.router.post("/signin", (req: Request, res: Response) =>
      this.controller.signin(req, res)
    );
    this.router.post("/signin/new_token", (req: Request, res: Response) =>
      this.controller.newAccessToken(req, res)
    );
    this.router.get("/logout", (req: Request, res: Response) =>
      this.controller.logout(req, res)
    );

    return this.router;
  }
}
