import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const REPORTREVIEW_API_URL = `${AppEnvironments.baseUrl}api/v1/revision_reporte`;

// Función para obtener el token almacenado en localStorage
const getAuthToken = () => localStorage.getItem('token');

// Configuración de cabeceras de autorización
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Obtener todas las revisiones de reporte
const getReportReview = async () => {
    try {
        const response = await axios.get(REPORTREVIEW_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisiones de reporte:', error);
        throw error;
    }
};

const getReportByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${REPORTREVIEW_API_URL}/student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};

// Agregar una nueva revisión de reporte
const addReportReview = async (reportReview) => {
    try {
        const response = await axios.post(REPORTREVIEW_API_URL, reportReview, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(
            'Error al agregar revisión de reporte:',
            error.response ? error.response.data : error.message
        );
        throw new Error('Error inesperado: ' + error.message);
    }
};

// Editar una revisión de reporte existente
const editReportReview = async (id, reportReview) => {
    try {
        const response = await axios.put(`${REPORTREVIEW_API_URL}/${id}`, reportReview, getAuthHeaders());
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado en la edición, pero continuando...');
            return;
        }
        console.error('Error al editar la revisión de reporte:', error);
        throw error;
    }
};

// Eliminar una revisión de reporte
const deleteReportReview = async (id) => {
    try {
        const response = await axios.delete(`${REPORTREVIEW_API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la revisión de reporte:', error);
        throw error;
    }
};

// Exportar funciones como un módulo
export default {
    getReportReview,
    getReportByStudentCode,
    addReportReview,
    editReportReview,
    deleteReportReview,
};
