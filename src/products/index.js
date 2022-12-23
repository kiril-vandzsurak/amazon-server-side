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

router.post("/", (req, res) => {
  console.log("REQUEST BODY:", req.body);
  const newObj = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log("NEW OBJECT", newObj);
  const objArray = JSON.parse(fs.readFileSync(productsJSONPath));
  objArray.push(newObj);
  fs.writeFileSync(productsJSONPath, JSON.stringify(objArray));
  res.status(201).send({ id: newObj.id });
});

export default router;
