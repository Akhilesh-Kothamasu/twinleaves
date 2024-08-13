import axios from 'axios';

const API_BASE_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products';

export const fetchProducts = async (page, search, category, sort) => {
    try {
        const params = {
            page,
            search,
            category,
            sort,
        };
        const response = await axios.get(API_BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
