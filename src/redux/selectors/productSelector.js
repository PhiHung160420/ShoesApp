export const getProductsFavoriteSelector = state =>
  state.ProductReducer.productsFavorite;

export const getAllProductsSelector = state =>
  state.ProductReducer.listProducts;

export const getProductByIdSelector = state => state.ProductReducer.productById;
