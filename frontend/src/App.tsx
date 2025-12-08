import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsListPage } from "./pages/ProductsListPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
