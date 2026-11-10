import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/producten">
                    Productcatalogus
                </Link>

                <div className="navbar-nav">
                    <NavLink to="/producten" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Producten
                    </NavLink>

                    <NavLink to="/producten/nieuw" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Nieuw product
                    </NavLink>

                    <NavLink to="/categorieen" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Categorieën
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
