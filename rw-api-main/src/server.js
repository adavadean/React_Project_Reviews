const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "products.json");
const PORT = Number(process.env.PORT) || 8055;

const app = express();
app.use(express.json());

const allowOrigin = "*";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

async function readProductData() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeProductData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/products", async (req, res) => {
  try {
    const data = await readProductData();
    res.json(data.products ?? []);
  } catch (error) {}
});

app.get("/products/:productId", async (req, res) => {
  try {
    const data = await readProductData();
    const needle = data.products.find(p => p.id === req.params.productId);
    res.json(needle ? [needle] : []);
  } catch (error) {
    console.error("Failed to fetch product", error);
    res.status(500).json({ error: "Unable to fetch product." });
  }
});

app.post("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { text, rating } = req.body || {};

  const normalizedText = typeof text === "string" ? text.trim() : "";
  const ratingNumber = Number(rating);

  //if (!normalizedText) {
 //   return res.status(400).json({ error: "Review text is required." });
  //}

  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return res.status(400).json({ error: "Rating must be an integer between 1 and 5." });
  }

  try {
    const data = await readProductData();
    const products = data.products ?? [];
    const product = products.find(item => item.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (!Array.isArray(product.reviews)) {
      product.reviews = [];
    }

    const newReview = {
      id: `${productId}-review-${Date.now()}`,
      text: normalizedText,
      rating: ratingNumber,
      createdAt: new Date().toISOString(),
    };

    product.reviews.push(newReview);
    await writeProductData(data);

    res.status(201).json({ product });
  } catch (error) {
    console.error(`Failed to add review for product ${productId}`, error);
    res.status(500).json({ error: "Unable to save review." });
  }
});

app.listen(PORT, () => {
  console.log(`Product API listening on port ${PORT}`);
});
