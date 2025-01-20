import axios from 'axios';
import Fuse from 'fuse.js';
import AppEnvironments from '../config/AppEnvironments';

const TITLERESERVATION_API_URL = `${AppEnvironments.baseUrl}api/v1/reservas_titulo/`;
const PDFONE_API_URL = `${AppEnvironments.baseUrl}api/v1/pdfDocument/OneStep/`;
const PROGRESS_API_URL = `${AppEnvironments.baseUrl}api/v1/progreso_estudiante/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});
// Función para buscar reservas de título
const searchTitleReservations = async (searchQuery) => {
    try {
        const response = await axios.get(`${TITLERESERVATION_API_URL}buscar?title=${searchQuery}`, getAuthHeaders());

        const data = response.data;

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
        const response = await axios.get(TITLERESERVATION_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching title reservations:', error);
        throw error;
    }
};
const getReservationByStudentCode = async (studentCode) =>{
    try {
        const response = await axios.get(`${TITLERESERVATION_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching title reservations:', error);
        throw error;
    }
}
// Obtener todas las reservas de título
const getProgresByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${PROGRESS_API_URL}${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching title reservations:', error);
        throw error;
    }
};



// Agregar una nueva reserva de título
const addTitleReservation = async (titlereservation) => {
    try {
        const response = await axios.post(TITLERESERVATION_API_URL, titlereservation, getAuthHeaders());
        return response.data;
    } catch (error) {
        // Verificar si es un error de duplicación de título
        if (error.response && error.response.status === 409 && error.response.data.includes('Ya existe una reserva con este título')) {
            throw new Error('Ya existe una reserva con este título. Por favor, elige otro título.');
        }

        console.error('Error en addTitleReservation:', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + error.message);
    }
};
// Editar una reserva de título existente
const editTitleReservation = async (id, titlereservation) => {
    try {
        const response = await axios.put(`${TITLERESERVATION_API_URL}${id}`, titlereservation, getAuthHeaders());
        return response.data;
    } catch (error) {
        // Verificar si es un error de duplicación de título en la edición
        if (error.response && error.response.status === 400 && error.response.data.includes('Ya existe una reserva con este título')) {
            throw new Error('Ya existe una reserva con este título. Por favor, elige otro título.');
        }

        console.error('Error en editTitleReservation:', error);
        throw new Error('Error inesperado: ' + error.message);
    }
};

// Eliminar una reserva de título
const deleteTitleReservation = async (id) => {
    try {
        const response = await axios.delete(`${TITLERESERVATION_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error deleting title reservation', error);
        throw error;
    }
};

// Subir un PDF para una reserva de título
const uploadPdf = async (reservaId, pdfData) => {
    try {
        const response = await axios.post(`${TITLERESERVATION_API_URL}${reservaId}/uploadPdf`, { pdfData }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al subir el PDF:', error);
        throw error;
    }
};

// Obtener PDF en base64 para vista previa
const viewPdf = async (reservaId) => {
    try {
        const response = await axios.get(`${PDFONE_API_URL}${reservaId}/view`, getAuthHeaders());
        return response.data.pdfData;
    } catch (error) {
        console.error('Error al obtener el PDF:', error);
        throw error;
    }
};

// Eliminar un PDF asociado a una reserva de título
const deletePdf = async (reservaId) => {
    try {
        const response = await axios.delete(`${PDFONE_API_URL}${reservaId}/delete`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el PDF:', error);
        throw error;
    }
};

export default {
    getTitleReservations,
    addTitleReservation,
    editTitleReservation,
    getReservationByStudentCode,
    deleteTitleReservation,
    searchTitleReservations,
    getProgresByStudentCode,
    uploadPdf,
    viewPdf,
    deletePdf,
};
