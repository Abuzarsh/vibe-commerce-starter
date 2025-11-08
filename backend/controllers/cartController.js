const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Checkout = require('../models/Checkout');
// POST /api/cart - add { productId, qty }
exports.addToCart = async (req, res) => {
try {
const { productId, qty } = req.body;
const product = await Product.findById(productId);
if (!product) return res.status(404).json({ message: 'Product not found' });
// if same product exists, update qty
let item = await CartItem.findOne({ product: productId });
if (item) {
item.qty += qty;
await item.save();
} else {
item = new CartItem({ product: productId, qty });
await item.save();
}
res.status(201).json(item);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};

// DELETE /api/cart/:id
exports.removeFromCart = async (req, res) => {
try {
const { id } = req.params;
await CartItem.findByIdAndDelete(id);
res.json({ message: 'Removed' });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
4
};
// GET /api/cart
exports.getCart = async (req, res) => {
try {
const items = await CartItem.find().populate('product');
const total = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
res.json({ items, total });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


// POST /api/checkout { cartItems }

exports.checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    // ✅ Get product info from DB to calculate total
    const ids = cartItems.map((c) => c.productId); // <-- important
    const items = await Product.find({ _id: { $in: ids } });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: 'Products not found' });
    }

    const total = cartItems.reduce((acc, it) => {
      const product = items.find((p) => p._id.toString() === it.productId);
      return product ? acc + product.price * it.qty : acc;
    }, 0);

    // ✅ Save checkout info
    const receipt = await Checkout.create({
      name,
      email,
      total,
      timestamp: new Date(),
    });

    // ✅ Optional: clear the cart
    await CartItem.deleteMany({});

    res.json({
      message: 'Checkout successful',
      receipt: {
        id: receipt._id,
        name,
        email,
        total,
        timestamp: receipt.timestamp,
      },
    });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Checkout error', error: err.message });
  }
};