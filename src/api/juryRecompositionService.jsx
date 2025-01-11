import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const JURY_RECOMPOSITION_API_URL = `${AppEnvironments.baseUrl}api/v1/recomposicion_jurado`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Obtener todas las recomposiciones de jurados
const getAllJuryRecompositions = async () => {
    try {
        const response = await axios.get(JURY_RECOMPOSITION_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching jury recompositions:', error);
        throw error;
    }
};

// Obtener una recomposición de jurado por ID
const getJuryRecompositionById = async (id) => {
    try {
        const response = await axios.get(`${JURY_RECOMPOSITION_API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching jury recomposition with ID ${id}:`, error);
        throw error;
    }
};

// Actualizar una recomposición de jurado por ID
const updateJuryRecomposition = async (id, juryRecomposition) => {
    try {
        const response = await axios.put(`${JURY_RECOMPOSITION_API_URL}/${id}`, juryRecomposition, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating jury recomposition with ID ${id}:`, error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

export default {
    getAllJuryRecompositions,
    getJuryRecompositionById,
    updateJuryRecomposition,
};
