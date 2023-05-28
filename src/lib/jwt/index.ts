import jwt from "jsonwebtoken";
import config from "../../config/index";

export class JwtEncryption {
  public async generate(payload: object, expire: number) {
    return jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: expire });
  }

  public async verify(payload: string) {
    return jwt.verify(payload, config.JWT_SECRET_KEY);
  }
}
