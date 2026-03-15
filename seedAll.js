require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

function readJSONFiles(dir) {
  let products = [];

  console.log("[readJSONFiles] Checking:", dir);
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir} — skipping`);
    return products;
  }

  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      products = products.concat(readJSONFiles(fullPath));
    } else if (entry.endsWith('.json')) {
      console.log(" → JSON file:", fullPath);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error("Error parsing JSON:", fullPath, err);
        continue;
      }

      if (!Array.isArray(data)) data = [data];

      const category = path.relative(path.join(__dirname, 'data'), fullPath)
        .replace(/\\/g, '/')
        .replace('.json', '');

      const dataWithCategory = data.map(item => ({
        ...item,
        _id: item.id,
        category,
        status: "available",
        imageUrl: item.imageUrl,  // `bg1.jpeg` or similar
      }));

      products = products.concat(dataWithCategory);
    }
  }

  return products;
}

async function seed() {
  try {
    const womenDir = path.resolve(__dirname, 'data', 'women');
    const menDir = path.resolve(__dirname, 'data', 'men');

    console.log("Scanning:", womenDir, menDir);

    const womenProducts = readJSONFiles(womenDir);
    const menProducts = readJSONFiles(menDir);
    const allProducts = [...womenProducts, ...menProducts];

    console.log("Found products:", allProducts.length);

    if (allProducts.length === 0) {
      console.error("No products found! Check directory paths.");
      mongoose.connection.close();
      return;
    }

    await Product.deleteMany({});
    await Product.insertMany(allProducts);
    console.log(`Inserted ${allProducts.length} products!`);

    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
}

seed();
