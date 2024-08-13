import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProducts } from '../services/api';
import { CircularProgress, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [rowCount, setRowCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(page, search, category, sort);
                setProducts(data.items);
                setRowCount(data.total);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        loadProducts();
    }, [page, search, category, sort]);

    const handlePageChange = (params) => {
        setPage(params.page + 1);
    };

    const handleRowClick = (params) => {
        navigate(`/product/${params.id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => <img src={params.value} alt={params.row.name} style={{ width: '100%' }} />,
        },
        { field: 'price', headerName: 'Price', width: 100 },
    ];

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <TextField
                label="Search by Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                style={{ marginBottom: '16px' }}
            />

            <FormControl variant="outlined" style={{ marginBottom: '16px', marginRight: '16px' }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" style={{ marginBottom: '16px' }}>
                <InputLabel>Sort by Price</InputLabel>
                <Select value={sort} onChange={(e) => setSort(e.target.value)} label="Sort by Price">
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>

            <DataGrid
                rows={products}
                columns={columns}
                pageSize={10}
                paginationMode="server"
                rowCount={rowCount}
                onPageChange={handlePageChange}
                onRowClick={handleRowClick}
                autoHeight
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default ProductList;



