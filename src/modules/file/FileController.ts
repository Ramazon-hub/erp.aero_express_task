import { Request, Response } from "express";
import path from "path";
import { deleteFile } from "../../lib/middleware/upload";
import { FileRepository } from "./FileRepository";

export class FileController {
  private fileRepo: FileRepository;
  constructor() {
    this.fileRepo = new FileRepository();
  }

  public async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Number(id)) {
        return res.status(400).json({ message: "id must be number" });
      }
      const file = await this.fileRepo.getOne(Number(id));
      return res.status(200).json(file);
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
  public async getAll(req: Request, res: Response) {
    try {
      let page = req.query.page || 1;
      let list_size = req.query.list_size || 10;

      const files = await this.fileRepo.getAll(Number(page), Number(list_size));
      return res.status(200).json(files);
    } catch (exception) {
      console.log(exception);

      return res.status(500).json({message:"Internal Server error"});
    }
  }
  public async upload(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "bad request" });
      }

      await this.fileRepo.create(file);

      return res.status(200).json({ message: "file created successfully" });
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
  public async download(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Number(id)) {
        return res.status(400).json({ message: "id must be number" });
      }
      const file = await this.fileRepo.getOne(Number(id));

      const sendImage = path.join(
        __dirname,
        `../../../uploads/${file.file_name}`
      );

      return res.status(200).download(sendImage);
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!Number(id)) {
        return res.status(400).json({ message: "id must be number" });
      }
      if (!file) {
        return res.status(400).json({ message: "you have to send file" });
      }
      const oldFile = await this.fileRepo.getOne(Number(id));
      deleteFile(oldFile.file_name);

      await this.fileRepo.create(file);

      return res.status(200).json({ message: "file updated successfully" });
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Number(id)) {
        return res.status(400).json({ message: "id must be number" });
      }
      const file = await this.fileRepo.getOne(Number(id));
      deleteFile(file.file_name);
      await this.fileRepo.delete(file);
      return res.status(200).json({ message: "file deleted successfully" });
    } catch (exception) {
      return res.status(500).json({message:"Internal Server error"});
    }
  }
}
