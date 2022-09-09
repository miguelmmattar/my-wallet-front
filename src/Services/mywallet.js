import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

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

function getPanel(token) {
    return axios.get(`${BASE_URL}/panel`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function deleteLogout(token) {
    return axios.get(`${BASE_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    postLogin,
    postSignUp,
    postNew,
    getPanel,
    deleteLogout
};