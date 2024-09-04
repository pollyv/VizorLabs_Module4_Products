import React from "react";

import "./ProductCard.css";

const ProductCard = ({ title, description, price, amount }) => {
    return (
        <div className="product-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Amount: {amount}</p>
        </div>
    );
};

export default ProductCard;
