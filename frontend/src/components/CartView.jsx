import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/api';
export default function CartView() {
const { cart, fetchCart } = useContext(CartContext);
const remove = async (id) => { await api.delete(`/api/cart/${id}`);
fetchCart(); };
return (
<div>
<h3>Cart</h3>
{cart.items.length === 0 ? <p>Empty</p> : (
<ul>
{cart.items.map(i => (
<li key={i._id}>
{i.product.name} x {i.qty} — ₹{i.product.price * i.qty}
<button onClick={() => remove(i._id)}>Remove</button>
</li>
))}
</ul>
)}
<h4>Total: ₹{cart.total}</h4>
</div>
);
}
