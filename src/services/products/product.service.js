import ApiService from "../api.service";
const ProductService = {
  GetAllProducts(data) {
    return ApiService.get(`/api/product`, data);
  },
  GetOneProduct(id) {
    return ApiService.get(`/api/product/${id}`);
  },
  GetCategories() {
    return ApiService.get(`/api/category`);
  },
  FilterProducts(data) {
    return ApiService.get(
      `/api/product?name=${data.name}&category=${data.category}&limit=${data.limit}&offset=${data.offset}`
    );
  },
};
export default ProductService;
