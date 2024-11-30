import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const PROGRESS_API_URL = `${AppEnvironments.baseUrl}api/v1/progreso_estudiante/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Obtener todas las reservas de título
const getProgresByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${PROGRESS_API_URL}${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
};
// Obtener todas las reservas de título
const getAllprogress = async () => {
    try {
        const response = await axios.get(`${PROGRESS_API_URL}todos/simplificado`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
};






export default {
    getAllprogress,
    getProgresByStudentCode,
};
