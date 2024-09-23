import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const TITLERESERVATION_API_URL = `${AppEnvironments.baseUrl}api/v1/reservas_titulo/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Obtener todas las reservas de título
const getTitleReservations = async () => {
    try {
        const response = await axios.get(TITLERESERVATION_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        console.log("La respuesta es: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching titlereservations', error);
        throw error;
    }
};

// Añadir una nueva reserva de título
const addTitleReservation = async (titlereservation) => {
    try {
        const response = await axios.post(TITLERESERVATION_API_URL, titlereservation, {
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
        console.error('Error en addTitleReservation:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }

        throw new Error('Error inesperado: ' + error.message);
    }
};

// Editar una reserva de título existente
const editTitleReservation = async (id, titlereservation) => {
    try {
        const response = await axios.put(`${TITLERESERVATION_API_URL}${id}`, titlereservation, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
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
};
