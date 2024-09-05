const ProductsEnum = {
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE: "FETCH_PRODUCTS_FAILURE",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
};

const initialState = {
  products: [],
  error: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductsEnum.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case ProductsEnum.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ProductsEnum.ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case ProductsEnum.EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case ProductsEnum.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const fetchProductsSuccess = (products) => ({
  type: ProductsEnum.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: ProductsEnum.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addProduct = (product) => ({
  type: ProductsEnum.ADD_PRODUCT,
  payload: product,
});

export const editProduct = (product) => ({
  type: ProductsEnum.EDIT_PRODUCT,
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: ProductsEnum.DELETE_PRODUCT,
  payload: productId,
});
