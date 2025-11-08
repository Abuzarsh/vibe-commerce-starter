import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
const [cart, setCart] = useState({ items: [], total: 0 });
const fetchCart = async () => {
try {
const res = await api.get('/api/cart');
setCart(res.data);
} catch (e) {
console.error(e);
}
};
useEffect(() => { fetchCart(); }, []);
return (
<CartContext.Provider value={{ cart, setCart, fetchCart }}>
{children}
</CartContext.Provider>
);
};
