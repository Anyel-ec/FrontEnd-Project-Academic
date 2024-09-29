import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
// Función para obtener el token de autenticación del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};
const PDFONE_API_URL = `${AppEnvironments.baseUrl}/api/v1/pdfDocument/OneStep/`;

// Obtener todas las reservas de título
const getPdfOne = async () => {
    try {
        const response = await axios.get(PDFONE_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        console.log("La respuesta es: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching pdfOne', error);
        throw error;
    }
};

// Añadir una nueva reserva de título
const addPdfOne = async (pdfOne) => {
    try {
        const response = await axios.post(PDFONE_API_URL, pdfOne, {
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
        console.error('Error en addPdfOne:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }

        throw new Error('Error inesperado: ' + error.message);
    }
};

// Editar una reserva de título existente
const editPdfOne = async (id, pdfOne) => {
    try {
        const response = await axios.put(`${PDFONE_API_URL}${id}`, pdfOne, {
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
const deletePdfOne = async (id) => {
    try {
        const response = await axios.delete(`${PDFONE_API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting pdfOne', error);
        throw error;
    }
};  

export default {
    getPdfOne,
    addPdfOne,
    editPdfOne,
    deletePdfOne,
};
