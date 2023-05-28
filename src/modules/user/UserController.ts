import { Request, Response } from "express";
import { JwtEncryption } from "../../lib/jwt";
import { UserRepository } from "./UserRepository";

export class UserController {
  private userRepo: UserRepository;
  private jwt: JwtEncryption;

  constructor() {
    this.userRepo = new UserRepository();
    this.jwt = new JwtEncryption();
  }

  public async getInfo(req: Request, res: Response) {
    try {
      const { access_token } = req.headers;
      
      const { user_id }: any = await this.jwt.verify(
        access_token.toString().split(" ")[1]
      );
      const user = await this.userRepo.getOne(user_id);
      return res.status(200).json(user);
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
}
