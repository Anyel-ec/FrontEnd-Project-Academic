import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const JURYNOTIFICATIONS_API_URL = `${AppEnvironments.baseUrl}api/v1/notificacion_jurados/`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

const getAllJuryNotifications = async () => {
    try {
        const response = await axios.get(JURYNOTIFICATIONS_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching jury notifications', error);
        throw error;
    }
};

const addJuryNotification = async (juryNotification) => {
    try {
        const response = await axios.post(JURYNOTIFICATIONS_API_URL, juryNotification, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding jury notification', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

const editJuryNotification = async (id, juryNotification) => {
    try {
        console.log('Datos enviados:', juryNotification); // Validar los datos aquí
        const response = await axios.put(`${JURYNOTIFICATIONS_API_URL}${id}`, juryNotification, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error en editJuryNotification:', error);
        throw error;
    }
};


const deleteJuryNotification = async (id) => {
    try {
        const response = await axios.delete(`${JURYNOTIFICATIONS_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error en deleteJuryNotification:', error);
        throw error;
    }
};
export default {
    getAllJuryNotifications,
    addJuryNotification,
    editJuryNotification,
    deleteJuryNotification,
};
