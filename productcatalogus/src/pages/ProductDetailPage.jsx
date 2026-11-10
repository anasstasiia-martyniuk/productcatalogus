import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        api.get(`/products/${id}`)
            .then((response) => {
                setProduct(response.data.data ?? response.data);
            })
            .catch((err) => {
                setError(err.response?.status === 404 ? "Product niet gevonden." : "Er is iets misgegaan bij het ophalen van het product.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, retry]);

    const handleDelete = () => {
        if (deleting) return;

        if (!window.confirm("Weet je zeker dat je dit product wilt verwijderen?")) {
            return;
        }

        setDeleting(true);
        setDeleteError(null);

        api.delete(`/products/${id}`)
            .then(() => {
                navigate("/producten");
            })
            .catch((err) => {
                setDeleteError(err.response?.data?.message || "Er is iets misgegaan bij het verwijderen van het product.");
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container py-4">
                <ErrorMessage message={error} onRetry={() => setRetry((previous) => previous + 1)}
                />

                <Link to="/producten" className="btn btn-outline-secondary">
                    Terug naar producten
                </Link>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="container py-4">
            <Link to="/producten" className="btn btn-outline-secondary mb-3">
                Terug naar producten
            </Link>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{product.name}</h1>

                <div className="d-flex gap-2">
                    <Link to={`/producten/${product.id}/bewerken`} className="btn btn-primary">
                        Bewerken
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Verwijderen..." : "Verwijderen"}
                    </button>
                </div>
            </div>

            {deleteError && <ErrorMessage message={deleteError} />}

            <div className="card">
                <div className="card-body">
                    <p><strong>SKU:</strong> {product.sku}</p>

                    <p>
                        <strong>Categorie:</strong>{" "}
                        {product.category?.name || "Geen categorie"}
                    </p>

                    <p>
                        <strong>Prijs:</strong>{" "}
                        {new Intl.NumberFormat("nl-NL", {
                            style: "currency",
                            currency: "EUR",
                        }).format(product.price_cents / 100)}
                    </p>

                    <p><strong>Voorraad:</strong> {product.stock}</p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {product.is_active ? "Actief" : "Niet actief"}
                    </p>

                    <p><strong>Beschrijving:</strong></p>

                    <p className="text-muted">
                        {product.description || "Geen beschrijving beschikbaar."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
