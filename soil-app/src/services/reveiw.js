import http from '../axios-config';

const fecthAll = id => {
    return http.get(`/reviews/${id}`);
};

const postReview = data => {
    return http.post('/reviews/post', data);
}

const getOne = ({ customerId, productId }) => {
    return http.get(`/reviews/one/${customerId}/${productId}`);
};

const deleteReview = ({ customerId, productId }) => {
    return http.delete(`/reviews/delete/${customerId}/${productId}`);
};

const updateReview = data => {
    return http.put(`/reviews/edit`, data);
};

export default {
    fecthAll,
    postReview,
    getOne,
    deleteReview,
    updateReview
};