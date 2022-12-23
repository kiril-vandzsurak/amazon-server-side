import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { writeFile } = fs;

// const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
// const productsJSONPath = join(dataFolderPath, "products.json");
// const reviewsJSONPath = join(dataFolderPath, "reviews.json");
const publicFolderPath = join(process.cwd(), "./public/images");

// export const getProducts = () => readJSON(productsJSONPath);
// export const writeProducts = (productsArray) =>
//   writeJSON(productsJSONPath, productsArray);
// export const getReviews = () => readJSON(reviewsJSONPath);
// export const writeReviews = (reviewArray) =>
//   writeJSON(reviewsJSONPath, reviewArray);

export const saveProductImage = (fileName, contentAsBuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsBuffer);
