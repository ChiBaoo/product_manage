import { Flex, Tag } from "antd";
import React from "react";
import { ProductType } from "../../type/product";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const queryClient = useQueryClient();

  const handleClick = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ["get-product-by-id"] });
    navigate(`/products/${id}`); // Navigate to the product route with the ID
  };
  return (
    <div className="w-full p-3" onClick={() => handleClick(product.id)}>
      <div className=" flex flex-col  rounded-lg shadow-lg  p-3">
        <div className=" h-1/2 transition-transform transform hover:scale-110">
          <img
            alt={product.title}
            src={product.thumbnail}
            className="rounded-lg h-1/2 mb-2"
          />
        </div>
        <p className="flex justify-between font-semibold text-gray-800">
          <span className="text-gray-800">{product.title || "No title"}</span>
        </p>
        <p className="font-thin text-sm text-gray-600 mb-3">
          {product.brand || "No brand"}
        </p>

        <Flex gap="4px 0" wrap>
          {product.tags.map(
            (
              tag,
              index // Corrected to include parameters
            ) => (
              <Tag key={index} color="magenta">
                {tag}
              </Tag> // Display each tag
            )
          )}
        </Flex>
        <div className="flex justify-between mt-3">
          <p className="text-gray-600 text-left text-lg ">
            {product.rating} ⭐
          </p>
          <p className="text-right text-lg font-semibold ">
            <span className="line-through text-red-500">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-green-500 ml-2">
              $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
