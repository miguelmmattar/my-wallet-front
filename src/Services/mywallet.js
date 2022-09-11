import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function postLogin(body) {
    return axios.post(`${BASE_URL}/auth/login`, body);
}

function getSession(token) {
    return axios.get(`${BASE_URL}/session`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
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
    return axios.delete(`${BASE_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function deleteTransaction(transactionId, token) {
    return axios.delete(`${BASE_URL}/remove/${transactionId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    postLogin,
    getSession,
    postSignUp,
    postNew,
    getPanel,
    deleteLogout,
    deleteTransaction
};