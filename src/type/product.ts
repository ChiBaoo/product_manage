// Define the type for the product prop
export interface Product {
  id: number; // Assuming the product has an id
  title: string; // Assuming the product has a title
  price: string; // Assuming the product has a price
  thumbnail: string; // Assuming the product has a thumbnail image
}

// Define the type for the product
export interface ProductType {
  id: string; // Assuming the product has an id
  title: string; // Assuming the product has a title
  brand: string; // Assuming the product has a brand
  price: number; // Assuming the product has a price
  discountPercentage: number; // Assuming the product has a discount percentage
  rating: number; // Assuming the product has a rating
  thumbnail: string; // Assuming the product has a thumbnail image
  tags: string[]; // Assuming the product has tags
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}
