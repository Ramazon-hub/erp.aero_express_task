import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, path.join(__dirname, "../../../uploads"));
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const filename = `${uuid()}${path.extname(file.originalname)}`;
    callback(null, filename);
  },
});

const { unlink } = require("fs");
const { join } = require("path");

export const deleteFile = (file: string) => {
  unlink(join(__dirname, "../../../uploads", file), (er: any) => {
    console.log(er);
  });
};

export const upload = multer({ storage: fileStorage });
