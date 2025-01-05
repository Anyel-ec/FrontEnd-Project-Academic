import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import User from '../models/User';

const USER_API_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/obtener/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// El username se pasa como parámetro
const getUser = async (username) => {
    try {
        const response = await axios.get(`${USER_API_URL}${username}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        // Mapear la respuesta si es necesario
        const userData = response.data.result;
        return new User(userData.idUser, userData.username, userData.firstName, userData.lastName, userData.email);
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
};

export default {
    getUser,
};
