import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import './index.css';
function App(){
return (
<CartProvider>
<div className="container">
<header><h1>Vibe Commerce</h1></header>
<main>
<section className="products"><ProductList/></section>
<aside className="cart">
<CartView/>
<CheckoutForm/>
</aside>
</main>
</div>
</CartProvider>
);
}
export default App;