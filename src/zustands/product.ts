import { create } from "zustand";
import { products } from "../pages/test.ts";

type Product = {
  id: number; // Adjust based on your product structure
  name: string; // Adjust based on your product structure
  price: string; // Adjust based on your product structure
  // Add other properties as needed
};

type ProductState = {
  products: Product[];
  setProducts: (newProducts: Product[]) => void;
  addProducts: (newProducts: Product[]) => void; // Add this line to use ProductState
};

const useProductStore = create<ProductState>((set) => ({
  products: products.products,
  setProducts: (newProducts) => set({ products: newProducts }),
  addProducts: (newProducts) =>
    set((state) => ({
      products: [...(state.products || []), ...newProducts], // Ensure state.products is iterable
    })),
}));

export default useProductStore;
