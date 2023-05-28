import { Request, Response, NextFunction } from "express";
import { RefreshTokenRepository } from "../../modules/refresh_token/RefreshTokenRepository";
import { JwtEncryption } from "../../lib/jwt";

export class AuthMiddleware {
  private jwt: JwtEncryption;
  private refTokenRepo: RefreshTokenRepository;

  constructor() {
    this.jwt = new JwtEncryption();
    this.refTokenRepo = new RefreshTokenRepository();

  }
  public async auth(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        req.url === "/signin" ||
        req.url === "/signup" ||
        req.url === "/signin/new_token"
      ) {
        return next();
      }
// client have to sent both token : acces and refresh
      const { access_token, refresh_token } = req.headers;
      if (!access_token && refresh_token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { user_id }: any = await this.jwt.verify(
        access_token.toString().split(" ")[1]
      );

      if (!user_id)
        return res.status(401).json({
          message: "Unauthorized!",
        });
        const refTokenDetail = await this.refTokenRepo.getTokenDetailByUserId(
          user_id
        );
  
        if (refTokenDetail.token !== refresh_token) {
          return res.status(401).json({ message: "Unuthorized please try to login " });
        }

      next();
    } catch (exception) {
      console.log(exception);

      return res.status(500).json(exception);
    }
  }
}
