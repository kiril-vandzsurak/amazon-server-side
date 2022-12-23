import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import uniqid from "uniqid";

const router = Router();

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "products.json"
);

router.get("/", (req, res) => {
  const fileContent = fs.readFileSync(productsJSONPath);
  const products = JSON.parse(fileContent);
  res.send(products);
});

export default router;
