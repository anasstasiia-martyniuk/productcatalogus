const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="alert alert-danger" role="alert">
            <p className="mb-2">{message}</p>
            {onRetry && (
                <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
                    Opnieuw proberen
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;