import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import uniqid from "uniqid";

const router = Router();

const reviewsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "reviews.json"
);

router.get("/", (req, res) => {
  const fileContent = fs.readFileSync(reviewsJSONPath);
  const reviews = JSON.parse(fileContent);
  res.send(reviews);
});

router.post("/", (req, res) => {
  console.log("REQUEST BODY:", req.body);
  const newReview = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log("NEW OBJECT", newReview);
  const reviewArray = JSON.parse(fs.readFileSync(reviewsJSONPath));
  reviewArray.push(newReview);
  fs.writeFileSync(reviewsJSONPath, JSON.stringify(reviewArray));
  res.status(201).send({ id: newReview.id });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const reviewsArray = JSON.parse(fs.readFileSync(reviewsJSONPath));
  const findObj = reviewsArray.find((review) => review.id === id);
  res.send(findObj);
});

router.put("/:id", (req, res) => {
  const reviewsArray = JSON.parse(fs.readFileSync(reviewsJSONPath));
  const index = reviewsArray.findIndex((review) => review.id === req.params.id);
  const oldReview = reviewsArray[index];
  const updateReview = { ...oldReview, ...req.body, updatedAt: new Date() };
  reviewsArray[index] = updateReview;
  fs.writeFileSync(reviewsJSONPath, JSON.stringify(reviewsArray));
  res.send(updateReview);
});

router.delete("/:id", (req, res) => {
  const reviewsArray = JSON.parse(fs.readFileSync(reviewsJSONPath));
  const remainingReviews = reviewsArray.filter(
    (review) => review.id !== req.params.id
  );
  fs.writeFileSync(reviewsJSONPath, JSON.stringify(remainingReviews));
  res.status(204).send();
});

export default router;
