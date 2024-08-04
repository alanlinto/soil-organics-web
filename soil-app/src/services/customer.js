import http from '../axios-config';

const create = data => {
    return http.post("/customers", data);
};

const signup = data => {
    return http.post("customers/signup", data);
};

const signin = data => {
    return http.post("/customers/signin/", data);
}
const update = (id, data) => {
    return http.put(`/customers/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/customers/${id}`);
};

const onebyusername = (username) => {
    return http.get(`/customers/${username}`);
};

const one = (id) => {
    return http.get(`/customers/${id}`);
};

const getAll = () => {
    return http.get("/customers");
};

export default {
    create,
    update,
    remove,
    onebyusername,
    signup,
    signin,
    one,
    getAll,
};
