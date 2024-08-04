import http from "../axios-config";

const getCartItems = () => {
    return http.get('/cartItems');
};

const getOneItem = (id) => {
    return http.get(`/cartItems/${id}`);
};

const addToCart = (data) => {
    return http.post('/cartItems/addItem/', data);
}

const updateQty = (data) => {
    return http.put('/cartItems/updateItemQty/', data);
};

const deleteById = (id) => {
    return http.delete(`/cartItems/${id}`);
};

export default {
    getCartItems,
    getOneItem,
    addToCart,
    updateQty,
    deleteById
};