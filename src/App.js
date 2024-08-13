import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { Container } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;


