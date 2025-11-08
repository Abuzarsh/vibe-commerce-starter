import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
export default function ProductList() {
const [products, setProducts] = useState([]);
const { fetchCart } = useContext(CartContext);
useEffect(() => { api.get('/api/products').then(r => setProducts(r.data)); },
[]);
const add = async (id) => {
await api.post('/api/cart', { productId: id, qty: 1 });
fetchCart();
};
return (
<div className="grid">
{products.map(p => (
<ProductCard key={p._id} product={p} onAdd={() => add(p._id)} />
))}
</div>
);
}
