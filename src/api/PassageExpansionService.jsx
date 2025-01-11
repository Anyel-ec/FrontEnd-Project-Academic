import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const PASSAGE_EXPANSION_API_URL = `${AppEnvironments.baseUrl}api/v1/expansion_tesis`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Obtener todas las PassageExpansions
const getAllPassageExpansions = async () => {
    try {
        const response = await axios.get(PASSAGE_EXPANSION_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching PassageExpansions:', error);
        throw error;
    }
};

// Obtener una PassageExpansion por ID
const getPassageExpansionById = async (id) => {
    try {
        const response = await axios.get(`${PASSAGE_EXPANSION_API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching PassageExpansion with ID ${id}:`, error);
        throw error;
    }
};

// Actualizar una PassageExpansion por ID
const updatePassageExpansion = async (id, passageExpansion) => {
    try {
        const response = await axios.put(`${PASSAGE_EXPANSION_API_URL}/${id}`, passageExpansion, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating PassageExpansion with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

export default {
    getAllPassageExpansions,
    getPassageExpansionById,
    updatePassageExpansion,
};
