import * as bcrypt from "bcrypt";
import config from "../../config/index";

export class BcryptEncryption {
  public async encrypt(password: string) {
    return await bcrypt.hash(password, Number(config.SALT_BCRYPT));
  }

  public async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
