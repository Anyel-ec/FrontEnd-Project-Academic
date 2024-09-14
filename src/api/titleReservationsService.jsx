import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import TitleReservation from '../models/TitleReservation';

const TITLERESERVATION_API_URL = `${AppEnvironments.baseUrl}api/v1/reservas_titulo/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getTitleReservations = async () => {
    try {
        const response = await axios.get(TITLERESERVATION_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data.map(
            (titlereservationData) =>
                new TitleReservation(
                    titlereservationData.id,
                    titlereservationData.meetsRequirements,
                    titlereservationData.student,
                    titlereservationData.project,
                    titlereservationData.observations,
                    titlereservationData.createdAt,
                    titlereservationData.updatedAt
                )
        );
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
        return new TitleReservation(
            response.data.id,
            response.data.meetsRequirements,
            response.data.student,
            response.data.project,
            response.data.observations
        );
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
    }
};

const editTitleReservation = async (id, titlereservation) => {
    try {
        const response = await axios.put(`${TITLERESERVATION_API_URL}${id}`, titlereservation, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return new TitleReservation(
            response.data.id,
            response.data.meetsRequirements,
            response.data.student,
            response.data.project,
            response.data.observations
        );
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
    }
};

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
