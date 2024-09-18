import React, { useEffect, useState } from "react";
import { useInfiniteQuery, QueryFunction } from "@tanstack/react-query";
import Product from "../apis/product.ts";
import useProductStore from "../zustands/product.ts"; // Import Zustand store
import InfiniteScroll from "react-infinite-scroll-component"; // InfiniteScroll component
import ProductCard from "../components/ProductList/ProductCard.tsx"; // Adjust the import if necessary
import { Card, Col, Input, Row, Skeleton, Spin } from "antd";
import { ProductType } from "../type/product"; // Assuming you have this type defined
import SearchList from "../components/ProductList/SearchList.tsx";
import LoadingCard from "../components/ProductList/LoadingCard.tsx";

const limit = 20;

// Define the query function for fetching products
const fetchProducts: QueryFunction<{ products: ProductType[] }> = async ({
  pageParam = 0,
}) => {
  const response = await Product.getLimitProduct(
    limit,
    pageParam,
    "title,brand,price,discountPercentage,rating,thumbnail,tags"
  );
  return response; // Ensure this returns the correct data structure
};
// Define the query function for searching products

const ProductList: React.FC = () => {
  const { addProducts, products } = useProductStore(); // Zustand store methods
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Infinite Query to fetch product data
  const { data, isLoading, fetchNextPage, hasNextPage, isSuccess } =
    useInfiniteQuery<{ products: ProductType[] }, Error>({
      queryKey: ["get-limit-product", searchTerm], // Include searchTerm in the query key
      queryFn: fetchProducts,
      getNextPageParam: (lastPage, allPages) => {
        const nextSkip = allPages.length * limit; // Calculate next skip
        return lastPage.products.length === limit ? nextSkip : undefined; // Check if more products available
      },
      enabled: true, // Always enabled, but will handle logic in the query function
    });

  useEffect(() => {
    if (isSuccess && data) {
      const newProducts = data.pages.flatMap((page) => page.products);
      addProducts(newProducts); // Add new products to Zustand store
    }
  }, [isSuccess, data, addProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value); // Update search term state after 2 seconds
  };

  return (
    <div>
      <h1>Product List</h1>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange} // Call handleSearchChange on input change
        style={{ marginBottom: "20px" }} // Add some margin for spacing
      />
      <div className="w-full flex flex-row">
        <div className="w-1/4">Sidebar Content</div>
        <div className="w-3/4">
          {products && !searchTerm && (
            <InfiniteScroll
              dataLength={products.length} // Length of the products array
              next={fetchNextPage} // Fetch the next page when scrolling
              hasMore={hasNextPage} // If there are more pages to load
              loader={<LoadingCard />} // Loader when fetching data
              endMessage={
                <p style={{ textAlign: "center" }}>No more products to load</p>
              } // Message when all data is loaded
            >
              <Row gutter={16}>
                {products &&
                  products.map((product) => (
                    <Col span={6} key={product.id}>
                      <ProductCard product={product} />{" "}
                      {/* Render product card */}
                    </Col>
                  ))}
              </Row>
            </InfiniteScroll>
          )}
          {isLoading && <LoadingCard />}
          {searchTerm && <SearchList searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
