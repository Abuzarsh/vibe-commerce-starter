import React from 'react';
export default function ReceiptModal({ receipt, onClose }) {
return (
<div className="modal">
<h3>Receipt</h3>
<p>Total: ₹{receipt.total}</p>
<p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
<p>Name: {receipt.name}</p>
<p>Email: {receipt.email}</p>
<button onClick={onClose}>Close</button>
</div>
);
}
