import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const CHANGE_ADVISOR_API_URL = `${AppEnvironments.baseUrl}api/v1/cambio_asesor`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Obtener todos los ChangeAdvisors
const getAllChangeAdvisors = async () => {
    try {
        const response = await axios.get(CHANGE_ADVISOR_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching ChangeAdvisors:', error);
        throw error;
    }
};

// Obtener un ChangeAdvisor por ID
const getChangeAdvisorById = async (id) => {
    try {
        const response = await axios.get(`${CHANGE_ADVISOR_API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching ChangeAdvisor with ID ${id}:`, error);
        throw error;
    }
};

// Actualizar un ChangeAdvisor por ID
const updateChangeAdvisor = async (id, changeAdvisor) => {
    try {
        const response = await axios.put(`${CHANGE_ADVISOR_API_URL}/${id}`, changeAdvisor, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating ChangeAdvisor with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

export default {
    getAllChangeAdvisors,
    getChangeAdvisorById,
    updateChangeAdvisor,
};
