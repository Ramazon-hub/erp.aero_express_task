import { Repository } from "typeorm";
import { FileEntity } from "./FileEntity";
import { AppDataSource } from "../../config/typeormconfig";
import path from "path";

export class FileRepository {
  private repo: Repository<FileEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(FileEntity);
  }
  async getOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async getAll(page: number, list_size: number) {
    const take = list_size;
    const skip = (page - 1) * take;
    return await this.repo.find({ take, skip });
  }
  async create(file: Express.Multer.File) {
    return this.repo.save(
      this.repo.create({
        file_name: file.filename,
        file_extension: path.extname(file.originalname),
        size: file.size,
        mime_type: file.mimetype,
      })
    );
  }
  async update() {}
  async delete(file: FileEntity) {
    return await this.repo.remove(file);
  }
}
