const Loader = () => {
    return (
        <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Laden...</span>
            </div>
        </div>
    );
}

export default Loader;