import express from "express";
import productsRouter from "./products/index.js";

const server = express();
const port = 3001;

server.use(express.json()); // to make all req.body DEFINED
server.use("/products", productsRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
