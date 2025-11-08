import React from 'react';
export default function ProductCard({ product, onAdd }) {
return (
<div className="card">
<h4>{product.name}</h4>
<p>₹{product.price}</p>
<button onClick={onAdd}>Add to Cart</button>
</div>
);
}
