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
  const newProduct = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log("NEW OBJECT", newProduct);
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  productsArray.push(newProduct);
  fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
  res.status(201).send({ id: newProduct.id });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const findObj = productsArray.find((product) => product.id === id);
  res.send(findObj);
});

router.put("/:id", (req, res) => {
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const index = productsArray.findIndex(
    (product) => product.id === req.params.id
  );
  const oldProduct = productsArray[index];
  const updateProduct = { ...oldProduct, ...req.body, updatedAt: new Date() };
  productsArray[index] = updateProduct;
  fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
  res.send(updateProduct);
});

router.delete("/:id", (req, res) => {
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const remainingProducts = productsArray.filter(
    (product) => product.id !== req.params.id
  );
  fs.writeFileSync(productsJSONPath, JSON.stringify(remainingProducts));
  res.status(204).send();
});

export default router;
