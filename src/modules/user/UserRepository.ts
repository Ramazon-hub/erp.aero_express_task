import { Repository } from "typeorm";
import { UserEntity } from "./UserEntity";
import { AppDataSource } from "../../config/typeormconfig";
import { BcryptEncryption } from "../../lib/bcrypt";
import { JwtEncryption } from "../../lib/jwt";

export class UserRepository {
  private repo: Repository<UserEntity>;
  private bcrypt: BcryptEncryption;
  private jwt: JwtEncryption;

  constructor() {
    this.repo = AppDataSource.getRepository(UserEntity);
    this.bcrypt = new BcryptEncryption();
    this.jwt = new JwtEncryption();
  }
  async getOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
  async getUserByPhoneNumber(phone_number: string) {
    return await this.repo.findOne({ where: { phone_number } });
  }
  async getAll() {
    return await this.repo.find();
  }
  async create(phone_number: string, password: string) {
    const hashshedPassword = await this.bcrypt.encrypt(password);
    return await this.repo.save(
      this.repo.create({ password: hashshedPassword, phone_number })
    );
  }
}
