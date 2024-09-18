import { API_ENDPOINTS } from "../config/Endpoint";
import http from "../config/Http";

const getFirstProduct = async () => {
  const response = await http.get(API_ENDPOINTS.PRODUCT);

  return response.data;
};

const getLimitProduct = async (limit, skip, field) => {
  const response = await http.get(
    API_ENDPOINTS.PRODUCT +
      `?limit=${limit}&skip=${skip}&select=${field}&search?q=phone`
  );

  return response.data;
};
const getProductDetail = async (id) => {
  const response = await http.get(API_ENDPOINTS.PRODUCT + `/${id}`);

  return response.data;
};

const searchProduct = async (data) => {
  console.log("searchTermLog", data);
  const response = await http.get(API_ENDPOINTS.PRODUCT + `/search?q=${data}`);

  return response.data;
};

const Product = {
  getFirstProduct,
  getLimitProduct,
  getProductDetail,
  searchProduct,
};

export default Product;
