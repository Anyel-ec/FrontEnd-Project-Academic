import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const JURYAPPOINTMENT_API_URL = `${AppEnvironments.baseUrl}api/v1/asignacion_jurados/`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

const getAllJuryAppointments = async () => {
    try {
        const response = await axios.get(JURYAPPOINTMENT_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching jury appointments', error);
        throw error;
    }
};
const getJuryByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${JURYAPPOINTMENT_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};
const addJuryAppointment = async (juryAppointment) => {
    try {
        const response = await axios.post(JURYAPPOINTMENT_API_URL, juryAppointment, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding jury appointment', error.response ? error.response.data : error.message);
        throw new Error('Error inesperado: ' + (error.response ? error.response.data.message : error.message));
    }
};

const editJuryAppointment = async (id, juryAppointment) => {
    try {
        console.log('Datos enviados:', juryAppointment); // Validar los datos aquí
        const response = await axios.put(`${JURYAPPOINTMENT_API_URL}${id}`, juryAppointment, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error en editJuryAppointment:', error);
        throw error;
    }
};


const deleteJuryAppointment = async (id) => {
    try {
        const response = await axios.delete(`${JURYAPPOINTMENT_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error en deleteJuryAppointment:', error);
        throw error;
    }
};
export default {
    getAllJuryAppointments,
    addJuryAppointment,
    getJuryByStudentCode,
    editJuryAppointment,
    deleteJuryAppointment,
};
