import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const PROJECTAPPROVAL_API_URL = `${AppEnvironments.baseUrl}api/v1/aprobacion_proyecto`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Obtener todas las reservas de título
const getProjectApproval = async () => {
    try {
        const response = await axios.get(PROJECTAPPROVAL_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projectApproval', error);
        throw error;
    }
};

const addProjectApproval = async (projectApproval) => {
    try {
        const response = await axios.post(PROJECTAPPROVAL_API_URL, projectApproval, {
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
        console.error('Error en addProjectApproval:', error.response ? error.response.data : error.message);

        // Ignorar el error 409 y continuar
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado, pero continuando...');
            return; // Evita lanzar el error
        }

        throw new Error('Error inesperado: ' + error.message);
    }
};

const editProjectApproval = async (id, projectApproval) => {
    try {
        const response = await axios.put(`${PROJECTAPPROVAL_API_URL}${id}`, projectApproval, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Ignorar el error 409 y continuar
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado en la edición, pero continuando...');
            return;
        }

        console.error('Error en editProjectApproval:', error);
        throw error;
    }
};


// Eliminar una reserva de título
const deleteProjectApproval = async (id) => {
    try {
        const response = await axios.delete(`${PROJECTAPPROVAL_API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting projectApproval', error);
        throw error;
    }
};

export default {
    getProjectApproval,
    addProjectApproval,
    editProjectApproval,
    deleteProjectApproval,
};
