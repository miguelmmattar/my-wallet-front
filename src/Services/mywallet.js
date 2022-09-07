import axios from 'axios';

const BASE_URL = 'localhost:5000';

function postLogin(body) {
    return axios.post(`${BASE_URL}/auth/login`, body);
}

function postSignUp(body) {
    return axios.post(`${BASE_URL}/auth/sign-up`, body);
}

function postNew(body, token) {
    return axios.post(`${BASE_URL}/new`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    postLogin,
    postSignUp
};