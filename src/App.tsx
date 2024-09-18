import React from "react"; // Import React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";

const App: React.FC = () => {
  // Define the component type
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
