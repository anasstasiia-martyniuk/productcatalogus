import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    
    const price = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(product.price_cents / 100);

    return (
        <Link
            to={`/producten/${product.id}`}
            className={`card h-100 text-decoration-none text-reset ${!product.is_active ? "bg-light text-secondary" : ""}`}
            style={{ cursor: "pointer" }}
        >
            <div className="card-body">
                <h5 className="card-title"> {product.name} </h5>

                <p className="card-text mb-1"> <strong>SKU:</strong> {product.sku} </p>
                <p className="card-text mb-1"> <strong>Categorie:</strong> {product.category?.name} </p>
                <p className="card-text mb-2"> <strong>Prijs:</strong> {price} </p>

                <div className="d-flex gap-2 flex-wrap">
                    {product.stock === 0 ? (<span className="badge text-bg-danger"> Uitverkocht </span>
                    ) : product.stock <= 4 ? (<span className="badge text-bg-warning"> Nog {product.stock} op voorraad </span>
                    ) : (<span className="badge text-bg-success"> Op voorraad: {product.stock} </span>
                    )}

                    {!product.is_active && (<span className="badge text-bg-secondary"> Niet actief </span>)}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
