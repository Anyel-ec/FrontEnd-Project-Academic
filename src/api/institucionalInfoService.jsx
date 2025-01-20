import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const INFO_API_URL = `${AppEnvironments.baseUrl}api/v1/informacion_institucional`;

const getAuthToken = () => localStorage.getItem('token');

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
    },
});

// Obtener la información única
const getInfo = async () => {
    try {
        const response = await axios.get(INFO_API_URL, getAuthHeaders());
        return response.data; // Asumimos que devuelve el objeto único
    } catch (error) {
        console.error('Error fetching institutional info:', error);
        throw error;
    }
};

// Actualizar la información única
const updateInfo = async (data) => {
    try {
        const response = await axios.put(INFO_API_URL, data, getAuthHeaders());
        console.log('Datos enviados al backend:', data); // Log para depuración
        return response.data;
    } catch (error) {
        console.error('Error updating institutional info:', error.response || error);
        throw error;
    }
};
export default {
    getInfo,
    updateInfo,
};
