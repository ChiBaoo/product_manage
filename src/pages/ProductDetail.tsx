import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../apis/product";
import { Button, Spin } from "antd";
import LoadingCard from "../components/ProductDetail/LoadingDetail.tsx";

const ProductDetail: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>(); // Change type to Record
  const navigate = useNavigate(); // Initialize useNavigate

  const { data: product, isLoading } = useQuery({
    queryKey: ["get-product-by-id"],
    queryFn: () => Product.getProductDetail(id),
  });
  console.log(product);

  const backToHome = () => {
    console.log("Navigating back to products..."); // Debugging line
    navigate(`/`); // Navigate to the product route
  };
  if (isLoading) {
    return <LoadingCard />;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Ensure this is the correct Button component */}
      <div className="flex flex-col md:flex-row">
        <Button onClick={backToHome}>Back</Button>{" "}
        <div className="image-section md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto mb-4 rounded-lg transition-transform transform hover:scale-110"
          />
        </div>
        <div className="info-section md:w-1/2 md:pl-6">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700">Brand: {product.brand}</p>
          <p className="text-xl font-semibold">
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
          <p className="text-gray-600">Rating: {product.rating} ⭐</p>
          <p className="text-gray-600">Category: {product.category}</p>

          <p className="text-gray-600">Status: {product.availabilityStatus}</p>
          <p className="text-gray-600">
            Minimum Order Quantity: {product.minimumOrderQuantity}
          </p>
        </div>
      </div>
      <div className="description-section mt-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <div className="specifications-section mt-6">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <p className="text-gray-700">SKU: {product.sku}</p>
        <p className="text-gray-700">Weight: {product.weight} kg</p>
        <p className="text-gray-700">
          Dimensions: {product.dimensions.width} x {product.dimensions.height} x{" "}
          {product.dimensions.depth} cm
        </p>
        <p className="text-gray-700">Warranty: {product.warrantyInformation}</p>
        <p className="text-gray-700">Shipping: {product.shippingInformation}</p>
      </div>
      <div className="tags-section mt-6">
        <h2 className="text-xl font-semibold">Tags</h2>
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="reviews-section mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="review bg-gray-100 p-4 rounded-lg mb-2">
            <p className="font-semibold">Rating: {review.rating} ⭐</p>
            <p>Comment: {review.comment}</p>
            <p className="text-gray-600">By: {review.reviewerName}</p>
          </div>
        ))}
      </div>
      <div className="return-policy-section mt-6">
        <h2 className="text-xl font-semibold">Return Policy</h2>
        <p className="text-gray-700">{product.returnPolicy}</p>
      </div>
      {/* <div className="meta-section mt-6">
        <h2 className="text-xl font-semibold">Meta Information</h2>
        <p className="text-gray-700">
          Created At: {new Date(product.meta.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          Updated At: {new Date(product.meta.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">Barcode: {product.meta.barcode}</p>
        <img
          src={product.meta.qrCode}
          alt="QR Code"
          className="mt-2 w-32 h-32"
        />
      </div> */}
    </div>
  );
};

export default ProductDetail;
