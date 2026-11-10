import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import validateProduct from "../utils/validateProduct";

const emptyForm = {
    category_id: "",
    name: "",
    sku: "",
    description: "",
    price: "",
    stock: "0",
    is_active: true,
};

const ProductFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ ...emptyForm });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        api.get("/categories")
            .then((response) => {
                setCategories(response.data.data ?? response.data);

                if (isEdit) {
                    return api.get(`/products/${id}`);
                }
            })
            .then((response) => {
                if (!response) return;

                const product = response.data.data ?? response.data;

                setFormData({
                    category_id: String(product.category_id),
                    name: product.name,
                    sku: product.sku,
                    description: product.description || "",
                    price: (product.price_cents / 100).toFixed(2).replace(".", ","),
                    stock: String(product.stock),
                    is_active: Boolean(product.is_active),
                });
            })
            .catch((error) => {
                setErrors({general: [ error.response?.status === 404 ? "Product niet gevonden." : "De gegevens konden niet worden geladen."]});
            })
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: undefined,
            general: undefined,
        });
    };

    const parsePrice = (value) => {
        const [euros, cents = ""] = value.split(",");

        return Number(euros) * 100 + Number(cents.padEnd(2, "0"));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        const validationErrors = validateProduct(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            category_id: Number(formData.category_id),
            name: formData.name.trim(),
            sku: formData.sku.trim(),
            description: formData.description.trim() || null,
            price_cents: parsePrice(formData.price),
            stock: Number(formData.stock),
            is_active: formData.is_active,
        };

        setIsSubmitting(true);

        const request = isEdit ? api.put(`/products/${id}`, payload) : api.post("/products", payload);

        request
            .then((response) => {
                const product = response.data.data ?? response.data;
                navigate(`/producten/${product.id}`);
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    const serverErrors = error.response.data.errors ?? {};

                    setErrors({
                        ...serverErrors,
                        price: serverErrors.price_cents,
                    });
                } else {
                    setErrors({
                        general: [
                            "Er is een fout opgetreden. Probeer het opnieuw.",
                        ],
                    });
                }
            })
            .finally(() => setIsSubmitting(false));
    };

    if (loading) return <Loader />;

    return (
        <div className="container py-4">
            <h1 className="mb-4">
                {isEdit ? "Product bewerken" : "Product toevoegen"}
            </h1>

            <form className="d-flex flex-column gap-3 card card-body" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category_id" className="form-label">
                        Categorie:
                    </label>

                    <select
                        id="category_id"
                        name="category_id"
                        className={`form-select ${errors.category_id?.[0] ? "is-invalid" : ""}`}
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">Selecteer een categorie</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {errors.category_id?.[0] && (
                        <p className="text-danger small mb-0">
                            {errors.category_id[0]}
                        </p>
                    )}
                </div>

                {[
                    ["name", "Productnaam:"],
                    ["sku", "SKU:"],
                ].map(([field, label]) => (
                    <div key={field}>
                        <label htmlFor={field} className="form-label">
                            {label}
                        </label>

                        <input
                            id={field}
                            type="text"
                            name={field}
                            className={`form-control ${errors[field]?.[0] ? "is-invalid" : ""}`}
                            value={formData[field]}
                            onChange={handleChange}
                        />

                        {errors[field]?.[0] && (
                            <p className="text-danger small mb-0">
                                {errors[field][0]}
                            </p>
                        )}
                    </div>
                ))}

                <div>
                    <label htmlFor="description" className="form-label">
                        Beschrijving:
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        maxLength={5000}
                        className={`form-control ${errors.description?.[0] ? "is-invalid" : ""}`}
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                    />

                    {errors.description?.[0] && (
                        <p className="text-danger small mb-0">
                            {errors.description[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="price" className="form-label">
                        Prijs (€):
                    </label>

                    <input
                        id="price"
                        type="text"
                        name="price"
                        placeholder="899,50"
                        className={`form-control ${errors.price?.[0] ? "is-invalid" : ""}`}
                        value={formData.price}
                        onChange={handleChange}
                    />

                    {errors.price?.[0] && (
                        <p className="text-danger small mb-0">
                            {errors.price[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="stock" className="form-label">
                        Voorraad:
                    </label>

                    <input
                        id="stock"
                        type="number"
                        name="stock"
                        min="0"
                        max="100000"
                        step="1"
                        className={`form-control ${errors.stock?.[0] ? "is-invalid" : ""}`}
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    {errors.stock?.[0] && (
                        <p className="text-danger small mb-0">
                            {errors.stock[0]}
                        </p>
                    )}
                </div>

                <div className="form-check">
                    <input
                        id="is_active"
                        type="checkbox"
                        name="is_active"
                        className="form-check-input"
                        checked={formData.is_active}
                        onChange={handleChange}
                    />

                    <label htmlFor="is_active" className="form-check-label">
                        Actief product
                    </label>
                </div>

                {errors.general?.[0] && (
                    <p className="text-danger mb-0">
                        {errors.general[0]}
                    </p>
                )}

                <div className="d-flex gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Bezig met opslaan…" : "Opslaan"}
                    </button>

                    <Link to="/producten" className="btn btn-outline-secondary">
                        Annuleren
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ProductFormPage;
