import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api/' });

export const login = async (username, password) => {
    const response = await API.post('token/', { username, password });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
};

export const register = async (username, password) => {
    await API.post('register/', { username, password });
};