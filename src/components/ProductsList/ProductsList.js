import React from "react";

import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import useProducts from "../../hooks/useProducts";
import { validationMessages } from "../../utils/utils";

import "./ProductsList.css";

const ProductsList = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    currentEditProduct,
    newProduct,
    products,
    error,
    loading,
    hasMoreProducts,
    handleEdit,
    handleDelete,
    handleSaveProduct,
    handleChange,
    loadMoreProducts,
    saveAttempted,
  } = useProducts();

  return (
    <div className="products-list-container">
      <h2>Products</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="button-container">
            <Button
              variant="primary"
              size="medium"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Create New Product
            </Button>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                stock={product.stock}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
          {hasMoreProducts && (
            <div className="button-container">
              <Button
                variant="primary"
                size="medium"
                onClick={loadMoreProducts}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentEditProduct ? "Edit Product" : "Create New Product"}</h2>
        <form>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={
              currentEditProduct ? currentEditProduct.title : newProduct.title
            }
            onChange={handleChange}
            error={
              saveAttempted && !newProduct.title
                ? validationMessages.titleRequired
                : ""
            }
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={
              currentEditProduct
                ? currentEditProduct.description
                : newProduct.description
            }
            onChange={handleChange}
            error={
              saveAttempted && !newProduct.description
                ? validationMessages.descriptionRequired
                : ""
            }
          />
          <Input
            type="number"
            name="price"
            placeholder="Price"
            value={
              currentEditProduct ? currentEditProduct.price : newProduct.price
            }
            onChange={handleChange}
            error={
              saveAttempted && !newProduct.price
                ? validationMessages.priceRequired
                : ""
            }
          />
          <Input
            type="number"
            name="stock"
            placeholder="Stock"
            value={
              currentEditProduct ? currentEditProduct.stock : newProduct.stock
            }
            onChange={handleChange}
            error={
              saveAttempted && !newProduct.stock
                ? validationMessages.stockRequired
                : ""
            }
          />
          <Button variant="primary" size="medium" onClick={handleSaveProduct}>
            {currentEditProduct ? "Save" : "Create"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsList;
