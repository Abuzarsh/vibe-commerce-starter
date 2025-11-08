import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/api';
import ReceiptModal from './ReceiptModal';

export default function CheckoutForm() {
  const { cart, fetchCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = { cartItems: cart.items, name, email };
      const res = await api.post('/api/cart/checkout', body);
      setReceipt(res.data.receipt);
      fetchCart(); // refresh or clear cart
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h3>Checkout</h3>
      <form onSubmit={submit} className="checkout-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          disabled={loading || cart.items.length === 0}
        >
          {loading ? 'Processing...' : 'Pay (mock)'}
        </button>
      </form>

      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}
