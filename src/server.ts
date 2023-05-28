import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import { AllRoutes } from "./routes/index";
import { AppDataSource } from "./config/typeormconfig";
import { AuthRoutes } from "modules/auth/AuthRoute";
import { AuthMiddleware } from "./lib/middleware/auth.middleware";
// import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { fileStorage } from "./lib/middleware/upload";
// import { config } from "src/config";
// import { AllExceptionsFilter } from "src/lib/filters/AllExceptionFilter";

// import { AppModule } from "./http/AppModule";

export class Server {
  public app: Application;
  public router: AllRoutes;
  public authMiddleware: AuthMiddleware;
  constructor() {
    this.app = express();
    this.router = new AllRoutes();
    this.authMiddleware = new AuthMiddleware();
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // this.app.use(fileUpload());
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../uploads"))
    );
    // this.app.use(multer({ storage: fileStorage }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    this.app.use((req: Request, res: Response, next: NextFunction) =>
      this.authMiddleware.auth(req, res, next)
    );
    this.app.use(this.router.routes());
  }
}
