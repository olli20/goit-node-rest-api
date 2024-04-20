import multer from "multer";
import sharp from "sharp";
import path from "path";
import { v4 } from "uuid";
import * as fse from "fs-extra";

import HttpError from "../utils/httpError.js";

export class ImageService {
  static initUploadImageMiddleware(fieldName) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(new HttpError(400, "Please, upload images only."), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(fieldName);
  }

  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 1 * 1024 * 1024)
    ) {
      throw new HttpError(400, "File is too large..");
    }

    const fileName = `${v4()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize({ height: options?.height ?? 300, width: options?.width ?? 300 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}
