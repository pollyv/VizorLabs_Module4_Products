import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";

import "./ProductCard.css";

const ProductCard = ({
  title,
  description,
  price,
  stock,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
      <div className="button-group">
        <Button variant="primary" size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
