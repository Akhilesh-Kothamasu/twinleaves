import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { CircularProgress, Typography } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        loadProduct();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6">{`Price: $${product.price}`}</Typography>
            <Typography variant="body1">{product.description}</Typography>
        </div>
    );
};

export default ProductDetails;
