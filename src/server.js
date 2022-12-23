import express from "express";
import productsRouter from "./products/index.js";
import reviewsRouter from "./reviews/index.js";
import filesRouter from "./files/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

server.use(express.json()); // to make all req.body DEFINED
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/files", filesRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
