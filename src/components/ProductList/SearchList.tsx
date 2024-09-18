import { Col, Row } from "antd";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import ProductCard from "./ProductCard.tsx";
import { ProductType } from "../../type/product";
import Product from "../../apis/product";
import { useQuery } from "@tanstack/react-query";

export default function SearchList({ searchTerm }) {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  ); // State for debounce timeout
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // State for debounced search term

  // Search function for products
  const searchProducts: QueryFunction<{
    products: ProductType[];
  }> = async () => {
    console.log("Fetching products for:", debouncedSearchTerm);
    if (!debouncedSearchTerm) return { products: [] }; // Handle case of empty search
    const response = await Product.searchProduct(debouncedSearchTerm);
    return response; // Ensure this returns the correct data structure
  };

  // Use react-query to fetch data based on the debounced search term
  const { data: products, isLoading } = useQuery({
    queryKey: ["get-product-by-id", debouncedSearchTerm], // Include debouncedSearchTerm in query key
    queryFn: searchProducts, // Query function
    enabled: !!debouncedSearchTerm, // Only run query if debouncedSearchTerm is not empty
  });

  // Log products and search terms for debugging
  useEffect(() => {
    console.log("Current searchTerm:", searchTerm);
    console.log("Current debouncedSearchTerm:", debouncedSearchTerm);
  }, [searchTerm, debouncedSearchTerm]);

  // Debounce logic for search term
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear previous timeout
    }

    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced search term after 2 seconds
    }, 2000);

    setDebounceTimeout(timeout); // Set new timeout

    // Cleanup on unmount
    return () => clearTimeout(timeout);
  }, [searchTerm]); // Run effect when searchTerm changes

  return (
    <div>
      {isLoading && <div>Loading...</div>} {/* Show loading state */}
      {products &&
        debouncedSearchTerm && ( // Check for debouncedSearchTerm
          <Row gutter={16}>
            {products.products?.map(
              (
                product: ProductType // Specify the type for product
              ) => (
                <Col span={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              )
            )}
          </Row>
        )}
    </div>
  );
}
