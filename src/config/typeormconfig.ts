import { FileEntity } from "../modules/file/FileEntity";
import { UserEntity } from "../modules/user/UserEntity";
import { DataSource } from "typeorm";
import config from "../config/index";
import path from "path";
export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DB_URL,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname,"../modules/**/*Entity.ts")]
});
