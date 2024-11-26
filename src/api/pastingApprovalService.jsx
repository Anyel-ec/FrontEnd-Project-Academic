import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

// URL base de la API
const PASTINGAPPROVAL_API_URL = `${AppEnvironments.baseUrl}api/v1/aprobacion_empastado/`;

// Obtener token de autenticación almacenado en localStorage
const getAuthToken = () => localStorage.getItem('token');

// Generar cabeceras de autorización
const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
        console.warn('No authentication token found');
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Función para manejar errores
const handleError = (error) => {
    console.error(
        'API Error:',
        error.response ? error.response.data : error.message
    );
    throw new Error(
        'Error inesperado: ' + (error.response ? error.response.data.message : error.message)
    );
};

// Servicio para obtener todos los registros
const getAllPastingApprovals = async () => {
    try {
        const response = await axios.get(PASTINGAPPROVAL_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
const getPastingByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${PASTINGAPPROVAL_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};
// Servicio para obtener un registro por ID
const getPastingApprovalById = async (id) => {
    try {
        const response = await axios.get(`${PASTINGAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para guardar un nuevo registro
const savePastingApproval = async (pastingApproval) => {
    try {
        const response = await axios.post(PASTINGAPPROVAL_API_URL, pastingApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para actualizar un registro existente
const updatePastingApproval = async (id, pastingApproval) => {
    try {
        const response = await axios.put(`${PASTINGAPPROVAL_API_URL}${id}`, pastingApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para eliminar un registro por ID
const deletePastingApprovalById = async (id) => {
    try {
        const response = await axios.delete(`${PASTINGAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Exportar servicios
export default {
    getAllPastingApprovals,
    getPastingApprovalById,
    savePastingApproval,
    getPastingByStudentCode,
    updatePastingApproval,
    deletePastingApprovalById,
};
