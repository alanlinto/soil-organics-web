import http from '../axios-config';

const getAll = () => {
    return http.get('/products');
};

const getbyId = (id) => {
    return http.get(`/products/${id}`);
};

export default {
    getAll,
    getbyId
};