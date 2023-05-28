import { JwtEncryption } from "./jwt";
import config from "../config/index";
export class GenerateToken {
  private jwt: JwtEncryption;
  constructor() {
    this.jwt = new JwtEncryption();
  }
  public async access(payload: object) {
    return this.jwt.generate(
      payload,
      Number(config.ACCESS_TOKEN_EXPIRE) * 1000
    );
  }

  public async refresh(payload: object) {
    return this.jwt.generate(
      payload,
      Number(config.REFRESH_TOKEN_EXPIRE) * 1000
    );
  }
}
