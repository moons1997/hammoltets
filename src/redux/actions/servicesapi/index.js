import ProductService from "../../../services/products/product.service";

export const refresh = (event) => {
  return (dispatch) => {
    ProductService.FilterProducts(event).then((res) => {
      dispatch({ type: "REFRESH", payload: res.data });
    });
  };
};
