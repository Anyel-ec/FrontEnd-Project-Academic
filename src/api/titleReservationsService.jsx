import axios from 'axios';
import Fuse from 'fuse.js';
import AppEnvironments from '../config/AppEnvironments';

const TITLERESERVATION_API_URL = `${AppEnvironments.baseUrl}api/v1/reservas_titulo/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const searchTitleReservations = async (searchQuery) => {
    try {
        const response = await axios.get(`${TITLERESERVATION_API_URL}buscar?title=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        const data = response.data;

        // Use Fuse.js for fuzzy search
        const fuse = new Fuse(data, { keys: ['title'], threshold: 0.3 });
        const results = fuse.search(searchQuery).map((result) => result.item);
        
        return results;
    } catch (error) {
        console.error('Error al buscar títulos:', error);
        throw error;
    }
};

// Obtener todas las reservas de título
const getTitleReservations = async () => {
    try {
        const response = await axios.get(TITLERESERVATION_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching titlereservations', error);
        throw error;
    }
};

const addTitleReservation = async (titlereservation) => {
    try {
        const response = await axios.post(TITLERESERVATION_API_URL, titlereservation, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Verificar si es un error de duplicación de título (código 400 con mensaje específico)
        if (error.response && error.response.status === 409 && error.response.data.includes("Ya existe una reserva con este título")) {
            throw new Error("Ya existe una reserva con este título. Por favor, elige otro título.");
        }

        console.error('Error en addTitleReservation:', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + error.message);
    }
};

const editTitleReservation = async (id, titlereservation) => {
    try {
        const response = await axios.put(`${TITLERESERVATION_API_URL}${id}`, titlereservation, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Verificar si es un error de duplicación de título en la edición
        if (error.response && error.response.status === 400 && error.response.data.includes("Ya existe una reserva con este título")) {
            throw new Error("Ya existe una reserva con este título. Por favor, elige otro título.");
        }

        console.error('Error en editTitleReservation:', error);
        throw new Error('Error inesperado: ' + error.message);
    }
};

// Eliminar una reserva de título
const deleteTitleReservation = async (id) => {
    try {
        const response = await axios.delete(`${TITLERESERVATION_API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting titlereservation', error);
        throw error;
    }
};

export default {
    getTitleReservations,
    addTitleReservation,
    editTitleReservation,
    deleteTitleReservation,
    searchTitleReservations,
};
