const Product = require('../models/Product');
// GET /api/products
exports.getProducts = async (req, res) => {
try {
const products = await Product.find();
res.json(products);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};
// Seed products endpoint (optional for dev)
exports.seedProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return res.json({ seeded: false });

    const mock = [
      { name: 'Wireless Headphones', price: 1999 },
      { name: 'Coffee Mug', price: 299 },
      { name: 'Backpack', price: 1499 },
      { name: 'Sunglasses', price: 799 },
      { name: 'Notebook', price: 199 },
    ];

    await Product.insertMany(mock);
    res.json({ seeded: true });
  } catch (err) {
    console.error('❌ Seed error details:', err);
    res.status(500).json({ message: 'Seed error' });
  }
};
