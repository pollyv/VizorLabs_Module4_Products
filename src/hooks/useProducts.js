import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct as addProductAction,
  editProduct as editProductAction,
  deleteProduct as deleteProductAction,
} from "../redux/productsSlice";
import {
  fetchProducts,
  fetchProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/productsApi";

const useProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [saveAttempted, setSaveAttempted] = useState(false);

  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    loadMoreProducts();
  }, []);

  const loadMoreProducts = useCallback(async () => {
    try {
      const fetchedProducts = await fetchProducts(9, products.length);
      if (fetchedProducts.length < 9) {
        setHasMoreProducts(false);
      }
      dispatch(fetchProductsSuccess([...products, ...fetchedProducts]));
    } catch (err) {
      console.error("Error fetching products:", err);
      dispatch(fetchProductsFailure("Failed to load products"));
    } finally {
      setLoading(false);
    }
  }, [dispatch, products.length]);

  const resetForm = () => {
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      stock: 0,
    });
    setCurrentEditProduct(null);
    setSaveAttempted(false);
  };

  const handleEdit = useCallback((product) => {
    setCurrentEditProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          const existingProduct = await fetchProductById(productId);

          if (!existingProduct) {
            console.warn("Product not found on server, cannot delete.");
          } else {
            const deletedProduct = await deleteProduct(productId);
            if (deletedProduct) {
              dispatch(deleteProductAction(deletedProduct.id));
            }
          }
        } catch (err) {
          console.error("Error deleting product:", err);
          dispatch(fetchProductsFailure("Failed to delete product"));
        }
      }
    },
    [dispatch]
  );

  const handleSaveProduct = useCallback(async () => {
    setSaveAttempted(true);

    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      return;
    }

    try {
      if (currentEditProduct) {
        const updatedProduct = await updateProduct(
          currentEditProduct.id,
          currentEditProduct
        );
        dispatch(editProductAction(updatedProduct));
      } else {
        const newCreatedProduct = await createProduct(newProduct);
        dispatch(addProductAction(newCreatedProduct));
        resetForm();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving product:", err);
      dispatch(fetchProductsFailure("Failed to save product"));
    }
  }, [dispatch, currentEditProduct, newProduct]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const newValue =
        name === "price" || name === "stock" ? parseFloat(value) : value;

      if (currentEditProduct) {
        setCurrentEditProduct({ ...currentEditProduct, [name]: newValue });
      } else {
        setNewProduct({ ...newProduct, [name]: newValue });
      }
    },
    [currentEditProduct, newProduct]
  );

  return {
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
  };
};

export default useProducts;
