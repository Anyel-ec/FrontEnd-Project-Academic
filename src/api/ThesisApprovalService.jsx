import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

// URL base de la API
const THESISAPPROVAL_API_URL = `${AppEnvironments.baseUrl}api/v1/aprobacion_tesis/`;

// Obtener token de autenticación almacenado en localStorage
const getAuthToken = () => localStorage.getItem('token');

// Generar cabeceras de autorización
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Servicio para obtener todos los registros
const getAllThesisApprovals = async () => {
    try {
        const response = await axios.get(THESISAPPROVAL_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching thesis approvals:', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

// Servicio para obtener un registro por ID
const getThesisApprovalById = async (id) => {
    try {
        const response = await axios.get(`${THESISAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching thesis approval with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

// Servicio para guardar un nuevo registro
const saveThesisApproval = async (thesisApproval) => {
    try {
        const response = await axios.post(THESISAPPROVAL_API_URL, thesisApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error saving thesis approval:', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

// Servicio para actualizar un registro existente
const updateThesisApproval = async (id, thesisApproval) => {
    try {
        const response = await axios.put(`${THESISAPPROVAL_API_URL}${id}`, thesisApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating thesis approval with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

// Servicio para eliminar un registro por ID
const deleteThesisApproval = async (id) => {
    try {
        const response = await axios.delete(`${THESISAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error deleting thesis approval with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

// Exportar servicios
export default {
    getAllThesisApprovals,
    getThesisApprovalById,
    saveThesisApproval,
    updateThesisApproval,
    deleteThesisApproval,
};
