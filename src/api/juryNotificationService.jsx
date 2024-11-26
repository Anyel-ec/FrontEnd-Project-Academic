import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const JURYNOTIFICATION_API_URL = `${AppEnvironments.baseUrl}api/v1/notificacion_jurados/`;

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
        const response = await axios.get(JURYNOTIFICATION_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching jury notifications', error);
        throw error;
    }
};
const getJuryByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${JURYNOTIFICATION_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};

const addJuryNotification = async (juryNotification) => {
    try {
        const response = await axios.post(JURYNOTIFICATION_API_URL, juryNotification, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding jury notification', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

const editJuryNotification = async (id, juryNotification) => {
    try {
        const response = await axios.put(`${JURYNOTIFICATION_API_URL}${id}`, juryNotification, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error editing jury notification:', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

const deleteJuryNotification = async (id) => {
    try {
        const response = await axios.delete(`${JURYNOTIFICATION_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error deleting jury notification:', error);
        throw error;
    }
};

export default {
    getAllJuryNotifications,
    addJuryNotification,
    getJuryByStudentCode,
    editJuryNotification,
    deleteJuryNotification,
};
