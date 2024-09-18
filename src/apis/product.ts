import { QueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../config/Endpoint";
import http from "../config/Http";
import { ProductDetail, ProductType } from "../type/product";

const getFirstProduct = async (): Promise<ProductType[]> => {
  const response = await http.get(API_ENDPOINTS.PRODUCT);
  return response.data;
};

const getLimitProduct = async (
  limit: number,
  skip: number,
  field: string
): Promise<ProductType[]> => {
  const response = await http.get(
    API_ENDPOINTS.PRODUCT +
      `?limit=${limit}&skip=${skip}&select=${field}&search?q=phone`
  );
  return response.data;
};

const getProductDetail = async (id: string): Promise<ProductDetail> => {
  const response = await http.get(API_ENDPOINTS.PRODUCT + `/${id}`);
  return response.data;
};

const searchProduct = async (data: string): Promise<ProductType[]> => {
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
