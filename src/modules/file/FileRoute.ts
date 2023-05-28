import { Request, Response, Router } from "express";
import { upload } from "../../lib/middleware/upload";
import { FileController } from "./FileController";

export class FileRoutes {
  private controller: FileController;
  private router: Router;
  constructor() {
    this.controller = new FileController();
    this.router = Router();
  }
  public routes() {
    this.router.post(
      "/upload",
      upload.single("file"),
      (req: Request, res: Response) => this.controller.upload(req, res)
    );
    this.router.get("/list", (req: Request, res: Response) =>
      this.controller.getAll(req, res)
    );
    this.router.get("/download/:id", (req: Request, res: Response) =>
      this.controller.download(req, res)
    );
    this.router.put(
      "/update/:id",
      upload.single("file"),
      (req: Request, res: Response) => this.controller.update(req, res)
    );
    this.router.delete("/delete/:id", (req: Request, res: Response) =>
      this.controller.delete(req, res)
    );
    this.router.get("/:id", (req: Request, res: Response) =>
      this.controller.getOne(req, res)
    );

    return this.router;
  }
}
