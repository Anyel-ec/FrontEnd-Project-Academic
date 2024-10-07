import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const RESERVATION_STEP_STATUS_API_URL = `${AppEnvironments.baseUrl}api/steps/status`;

const getAuthToken = () => localStorage.getItem('token');

export const fetchStudentProgress = async (username, studentCode, stepNumber) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/steps/progress/${username}`, {
            params: { studentCode, stepNumber },
            headers: { Authorization: `Bearer ${getAuthToken()}` }, // Solo si no usas axios.defaults.headers
        });
        
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('No se encontró información del progreso del estudiante');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
        throw error;  // Lanza el error para que pueda ser manejado donde se use esta función
    }
};


// Actualizar el estado de un paso
const updateStepStatus = async (studentCode, stepNumber, isCompleted) => {
    try {
        const status = { studentCode, stepNumber, isCompleted };
        const response = await axios.post(`${RESERVATION_STEP_STATUS_API_URL}/update`, status, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;  // Retorna el objeto actualizado directamente
    } catch (error) {
        console.error('Error updating step status', error);
        throw error;
    }
};

export default {
    fetchStudentProgress,
    updateStepStatus,
};
