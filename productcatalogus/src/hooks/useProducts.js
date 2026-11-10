
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

function useProducts() {
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        setError(null);

        api.get("/products", {
            params: Object.fromEntries(searchParams.entries()),
            signal: controller.signal,
        })
            .then((response) => {
                const { data, meta } = response.data;

                setProducts(data);
                setPagination(meta);
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") {
                    setError(
                        err.response?.data?.message ||
                        "Er is iets misgegaan bij het ophalen van producten."
                    );
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [searchParams]);

    return { products, pagination, loading, error };
}

export default useProducts;
