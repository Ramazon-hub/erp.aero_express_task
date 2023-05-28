import { Request, Response } from "express-serve-static-core";
import { HttpError } from "../../lib/error/HttpError";
import { BcryptEncryption } from "../../lib/bcrypt";
import { JwtEncryption } from "../../lib/jwt";
import { UserRepository } from "../../modules/user/UserRepository";
import { GenerateToken } from "../../lib/token.generate";
import { RefreshTokenRepository } from "../../modules/refresh_token/RefreshTokenRepository";

export class AuthController {
  private userRepo: UserRepository;
  private bcrypt: BcryptEncryption;
  private jwt: JwtEncryption;
  private genToken: GenerateToken;
  private refTokenRepo: RefreshTokenRepository;
  constructor() {
    this.userRepo = new UserRepository();
    this.bcrypt = new BcryptEncryption();
    this.jwt = new JwtEncryption();
    this.genToken = new GenerateToken();
    this.refTokenRepo = new RefreshTokenRepository();
  }

  public async signin(req: Request, res: Response) {
    try {
      const { phone_number, password } = req.body;
      if (!phone_number || !password) {
        return res.status(400).json({ message: "bad request" });
      }
      const user = await this.userRepo.getUserByPhoneNumber(phone_number);
      if (!user) {
        return res
          .status(400)
          .json({ message: "phone_number or password is invalid" });
      }
      const isValid = await this.bcrypt.compare(password, user.password);
      if (!isValid) {
        return res
          .status(400)
          .json({ message: "phone_number or password is invalid" });
      }

      const access_token = await this.genToken.access({ user_id: user.id });

      const refresh_token = await this.genToken.refresh({
        user_id: user.id,
        created_at: new Date(),
      });

      let refreshToken = await this.refTokenRepo.getTokenDetailByUserId(
        user.id
      );
      refreshToken.token = refresh_token;

      await this.refTokenRepo.save(refreshToken);

      return res.status(200).json({ access_token, refresh_token });
    } catch (exception) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }

  public async signup(req: Request, res: Response) {
    try {
      const { phone_number, password } = req.body;
      if (!phone_number || !password) {
        return res.status(400).json({ message: "bad request" });
      }

      const user = await this.userRepo.create(phone_number, password);

      const access_token = await this.genToken.access({ user_id: user.id });

      const refresh_token = await this.genToken.refresh({
        user_id: user.id,
        created_at: new Date(),
      });

      await this.refTokenRepo.create(user.id, refresh_token);

      return res.status(201).json({ access_token, refresh_token });
    } catch (exception) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }
  public async logout(req: Request, res: Response) {
    try {
      const { access_token } = req.headers;
      const { user_id }: any = await this.jwt.verify(
        access_token.toString().split(" ")[1]
      );
      const refTokenDetail = await this.refTokenRepo.getTokenDetailByUserId(
        user_id
      );
      refTokenDetail.token = "";
      await this.refTokenRepo.save(refTokenDetail);
      res.status(200).json({ message: "logout" });
    } catch (exception) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }
  public async newAccessToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;
      if (!refresh_token) {
        return res.status(400).json({ message: "bad request" });
      }

      const { user_id }: any = await this.jwt.verify(refresh_token);
      if (!user_id)
        return res.status(401).json({
          message: "Unauthorized!",
        });

      const refTokenDetail = await this.refTokenRepo.getTokenDetailByUserId(
        user_id
      );

      if (refTokenDetail.token !== refresh_token) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const access_token = await this.genToken.access({ user_id });

      return res.status(200).json({ access_token });
    } catch (exception) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }
}
