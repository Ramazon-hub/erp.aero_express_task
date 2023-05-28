import { Repository } from "typeorm";
import { AppDataSource } from "../../config/typeormconfig";
import { BcryptEncryption } from "../../lib/bcrypt";
import { JwtEncryption } from "../../lib/jwt";
import { RefreshTokenEntity } from "./RefreshTokenEntity";

export class RefreshTokenRepository {
  private repo: Repository<RefreshTokenEntity>;
  private bcrypt: BcryptEncryption;
  private jwt: JwtEncryption;

  constructor() {
    this.repo = AppDataSource.getRepository(RefreshTokenEntity);
    this.bcrypt = new BcryptEncryption();
    this.jwt = new JwtEncryption();
  }
  async getOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
  async getTokenDetailByUserId(user_id: number) {
    return this.repo.findOne({
      where: { user: { id: user_id } },
    });
  }
  async getAll() {
    return await this.repo.find();
  }
  async create(user_id: number, token: string) {
    return await this.repo.save(
      this.repo.create({ user: { id: user_id }, token })
    );
  }

  async save(entity: RefreshTokenEntity) {
    return await this.repo.save(entity);
  }
}
