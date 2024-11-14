import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const REPORTREVIEW_API_URL = `${AppEnvironments.baseUrl}api/v1/revision_reporte`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Obtener todas las reservas de título
const getReportReview = async () => {
    try {
        const response = await axios.get(REPORTREVIEW_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reportReview', error);
        throw error;
    }
};

const addReportReview = async (reportReview) => {
    try {
        const response = await axios.post(REPORTREVIEW_API_URL, reportReview, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('El servidor no devolvió datos en la respuesta.');
        }
    } catch (error) {
        console.error('Error en agregar la revisión de reporte :', error.response ? error.response.data : error.message);

        throw new Error('Error inesperado: ' + error.message);
    }
};

const editReportReview = async (id, reportReview) => {
    try {
        const response = await axios.put(`${REPORTREVIEW_API_URL}/${id}`, reportReview, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Ignorar el error 409 y continuar
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado en la edición, pero continuando...');
            return;
        }

        console.error('Error en editReportReview:', error);
        throw error;
    }
};

// Eliminar una reserva de título
const deleteReportReview = async (id) => {
    try {
        const response = await axios.delete(`${REPORTREVIEW_API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting reportReview', error);
        throw error;
    }
};

export default {
    getReportReview,
    addReportReview,
    editReportReview,
    deleteReportReview,
};
