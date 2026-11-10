const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const current = Number(currentPage);
    const last = Number(lastPage);

    if (!last || last <= 1) return null;

    return (
        <nav aria-label="Product pagination">
            <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${current <= 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current - 1)}
                        disabled={current <= 1}
                    >
                        Vorige
                    </button>
                </li>

                <li className="page-item disabled">
                    <span className="page-link">
                        Pagina {current} van {last}
                    </span>
                </li>

                <li className={`page-item ${current >= last ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current + 1)}
                        disabled={current >= last}
                    >
                        Volgende
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
