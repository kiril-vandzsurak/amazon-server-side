import express from "express";
import multer from "multer";
import { saveProductImage } from "../lib/fs-tools.js";

const filesRouter = express.Router();

//:id/upload
filesRouter.post(
  "/:id/upload",
  multer().single("productPicture"),
  async (req, res, next) => {
    try {
      console.log("FILE:", req.file);
      await saveProductImage(req.file.originalname, req.file.buffer);
      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
