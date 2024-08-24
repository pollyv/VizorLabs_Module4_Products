import React from "react";

import "./ProductsList.css";

const ProductsList = () => {
  return (
    <div className="products-list-container">
      <h2>Products</h2>
      <div className="products-grid">{/* Сюда добавлю карточки */}</div>
    </div>
  );
};

export default ProductsList;
