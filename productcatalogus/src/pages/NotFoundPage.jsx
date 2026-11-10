import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="container text-center py-5">
            <h1 className="display-4">404</h1>
            <h2>Pagina niet gevonden</h2>

            <p className="text-muted">
                De pagina die je zoekt bestaat niet.
            </p>

            <Link to="/producten" className="btn btn-primary">
                Terug naar producten
            </Link>
        </div>
    );
}

export default NotFoundPage;
