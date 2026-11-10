import { Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Navigate to="/producten" replace />} />
                <Route path="/producten" element={<ProductsPage />} />
                <Route path="/producten/nieuw" element={<ProductFormPage />} />
                <Route path="/producten/:id" element={<ProductDetailPage />} />
                <Route path="/producten/:id/bewerken" element={<ProductFormPage />} />
                <Route path="/categorieen" element={<CategoriesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;