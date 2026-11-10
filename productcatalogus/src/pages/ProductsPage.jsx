
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, pagination, loading, error } = useProducts();

    const [categories, setCategories] = useState([]);
    const [categoryError, setCategoryError] = useState(null);
    const [filterError, setFilterError] = useState(null);

    const [filters, setFilters] = useState({
        search: "",
        category: "",
        min_price: "",
        max_price: "",
        in_stock: false,
        is_active: "",
        sort: "name",
        direction: "asc",
        per_page: "10",
    });

    useEffect(() => {
        setFilters({
            search: searchParams.get("search") || "",
            category: searchParams.get("category") || "",
            min_price: searchParams.get("min_price") || "",
            max_price: searchParams.get("max_price") || "",
            in_stock: searchParams.get("in_stock") === "1",
            is_active: searchParams.get("is_active") || "",
            sort: searchParams.get("sort") || "name",
            direction: searchParams.get("direction") || "asc",
            per_page: searchParams.get("per_page") || "10",
        });
    }, [searchParams]);

    useEffect(() => {
        api.get("/categories")
            .then((response) => {
                setCategories(response.data.data ?? response.data);
            })
            .catch(() => {
                setCategoryError("De categorieën konden niet worden geladen.");
            });
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFilters({
            ...filters,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFilterError(null);

        const pricePattern = /^\d+(,\d{1,2})?$/;

        if ((filters.min_price && !pricePattern.test(filters.min_price)) || (filters.max_price && !pricePattern.test(filters.max_price))) {
            setFilterError("Gebruik een komma, bijvoorbeeld 899,50.");
            return;
        }

        const min = filters.min_price ? Number(filters.min_price.replace(",", ".")) : null;
        const max = filters.max_price ? Number(filters.max_price.replace(",", ".")) : null;

        if (min !== null && max !== null && min > max) {
            setFilterError("De minimumprijs mag niet hoger zijn dan de maximumprijs.");
            return;
        }

        const next = new URLSearchParams();

        if (filters.search.trim()) {
            next.set("search", filters.search.trim());
        }

        if (filters.category) {
            next.set("category", filters.category);
        }

        if (filters.min_price !== "") {
            next.set("min_price", String(Math.round(min * 100)));
        }

        if (filters.max_price !== "") {
            next.set("max_price", String(Math.round(max * 100)));
        }

        if (filters.in_stock) {
            next.set("in_stock", "1");
        }

        if (filters.is_active !== "") {
            next.set("is_active", filters.is_active);
        }

        next.set("sort", filters.sort);
        next.set("direction", filters.direction);
        next.set("per_page", filters.per_page);
        next.set("page", "1");

        setSearchParams(next);
    };

    const handlePageChange = (page) => {
        const next = new URLSearchParams(searchParams);
        next.set("page", String(page));
        setSearchParams(next);
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            category: "",
            min_price: "",
            max_price: "",
            in_stock: false,
            is_active: "",
            sort: "name",
            direction: "asc",
            per_page: "10",
        });

        setSearchParams({});
        setFilterError(null);
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Producten</h1>

                <Link to="/producten/nieuw" className="btn btn-primary">
                    Product toevoegen
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="card card-body mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Zoeken</label>
                        <input
                            name="search"
                            className="form-control"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Productnaam of SKU"
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Categorie</label>
                        <select
                            name="category"
                            className="form-select"
                            value={filters.category}
                            onChange={handleChange}
                        >
                            <option value="">Alle categorieën</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">Minimumprijs (€)</label>
                        <input
                            name="min_price"
                            className="form-control"
                            value={filters.min_price}
                            onChange={handleChange}
                            placeholder="0,00"
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">Maximumprijs (€)</label>
                        <input
                            name="max_price"
                            className="form-control"
                            value={filters.max_price}
                            onChange={handleChange}
                            placeholder="1000,00"
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Sorteren op</label>
                        <select
                            name="sort"
                            className="form-select"
                            value={filters.sort}
                            onChange={handleChange}
                        >
                            <option value="name">Naam</option>
                            <option value="price_cents">Prijs</option>
                            <option value="stock">Voorraad</option>
                            <option value="created_at">Toegevoegd op</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Richting</label>
                        <select
                            name="direction"
                            className="form-select"
                            value={filters.direction}
                            onChange={handleChange}
                        >
                            <option value="asc">Oplopend</option>
                            <option value="desc">Aflopend</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Status</label>
                        <select
                            name="is_active"
                            className="form-select"
                            value={filters.is_active}
                            onChange={handleChange}
                        >
                            <option value="">Alle producten</option>
                            <option value="1">Actief</option>
                            <option value="0">Inactief</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Per pagina</label>
                        <select
                            name="per_page"
                            className="form-select"
                            value={filters.per_page}
                            onChange={handleChange}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <div className="form-check mt-2">
                            <input
                                id="in_stock"
                                type="checkbox"
                                name="in_stock"
                                className="form-check-input"
                                checked={filters.in_stock}
                                onChange={handleChange}
                            />

                            <label htmlFor="in_stock" className="form-check-label">
                                Alleen producten op voorraad
                            </label>
                        </div>
                    </div>
                </div>

                {filterError && (
                    <div className="alert alert-danger mt-3 mb-0">
                        {filterError}
                    </div>
                )}

                <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-primary" type="submit">
                        Filteren
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={clearFilters}
                    >
                        Wissen
                    </button>
                </div>
            </form>

            {categoryError && <ErrorMessage message={categoryError} />}
            {error && <ErrorMessage message={error} />}

            {loading ? (
                <Loader />
            ) : (
                <>
                    {products.length === 0 ? (
                        <p className="text-muted">Geen producten gevonden.</p>
                    ) : (
                        <div className="row g-3">
                            {products.map((product) => (
                                <div className="col-md-6 col-lg-4" key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}

                    {pagination && (
                        <Pagination
                            currentPage={pagination.current_page}
                            lastPage={pagination.last_page}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPage;
