import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [saving, setSaving] = useState(false);

    const loadCategories = () => {
        setLoading(true);
        setError(null);

        api.get("/categories")
            .then((response) => {
                setCategories(response.data.data ?? response.data);
            })
            .catch(() => {
                setError("De categorieën konden niet worden geladen.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCreate = (event) => {
        event.preventDefault();

        setError(null);
        setSaving(true);

        api.post("/categories", { name: name.trim() })
            .then(() => {
                setName("");
                loadCategories();
            })
            .catch((error) => {
                setError(error.response?.data?.errors?.name?.[0] || "De categorie kon niet worden toegevoegd.");
            })
            .finally(() => setSaving(false));
    };

    const handleUpdate = (id) => {
        setError(null);
        setSaving(true);

        api.put(`/categories/${id}`, { name: editingName.trim() })
            .then(() => {
                setEditingId(null);
                setEditingName("");
                loadCategories();
            })
            .catch((error) => {
                setError(error.response?.data?.errors?.name?.[0] || "De categorie kon niet worden gewijzigd.");
            })
            .finally(() => setSaving(false));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Weet je zeker dat je deze categorie wilt verwijderen?")) {
            return;
        }

        setError(null);

        api.delete(`/categories/${id}`)
            .then(() => loadCategories())
            .catch((error) => {
                setError(error.response?.data?.message || "De categorie kon niet worden verwijderd.");
            });
    };

    if (loading) return <Loader />;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Categorieën</h1>

                <Link to="/producten" className="btn btn-outline-secondary">
                    Terug naar producten
                </Link>
            </div>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleCreate} className="card card-body mb-4">
                <label className="form-label">Nieuwe categorie</label>

                <div className="d-flex gap-2">
                    <input
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Categorienaam"
                        maxLength="100"
                        required
                    />

                    <button className="btn btn-primary" disabled={saving}>
                        Toevoegen
                    </button>
                </div>
            </form>

            <div className="list-group">
                {categories.length === 0 && (<p className="text-muted">Geen categorieën gevonden.</p>)}

                {categories.map((category) => (
                    <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center gap-3">
                        {editingId === category.id ? (
                            <>
                                <input
                                    className="form-control"
                                    value={editingName}
                                    onChange={(event) => setEditingName(event.target.value)}
                                    maxLength="100"
                                />

                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleUpdate(category.id)}
                                        disabled={saving}
                                    >
                                        Opslaan
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditingName("");
                                        }}
                                    >
                                        Annuleren
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <strong>{category.name}</strong>

                                    <div className="text-muted small">
                                        Producten: {category.products_count}
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => {
                                            setEditingId(category.id);
                                            setEditingName(category.name);
                                        }}
                                    >
                                        Bewerken
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Verwijderen
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
