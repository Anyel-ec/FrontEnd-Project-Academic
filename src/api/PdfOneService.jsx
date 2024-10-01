import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

// Función para obtener el token de autenticación del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Definir la URL base para los endpoints de documentos PDF
const PDFONE_API_URL = `${AppEnvironments.baseUrl}/api/v1/pdfDocument/OneStep/`;

// Obtener un documento PDF asociado a una reserva específica por su ID
const getPdfOneByReservationId = async (reservationId) => {
    try {
        const response = await axios.get(`${PDFONE_API_URL}${reservationId}/view`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data; // Devolver los datos del documento PDF
    } catch (error) {
        console.error('Error fetching PDF document:', error);
        throw error;
    }
};

// Añadir un nuevo documento PDF asociado a una reserva
const addPdfOne = async (reservationId, pdfData) => {
    try {
        const response = await axios.post(`${PDFONE_API_URL}${reservationId}/upload`, pdfData, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        if (response.data) {
            return response.data; // Devolver los datos del documento guardado
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

// Editar un documento PDF asociado a una reserva existente
const editPdfOne = async (reservationId, pdfData) => {
    try {
        const response = await axios.put(`${PDFONE_API_URL}${reservationId}`, pdfData, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data; // Devolver los datos del documento editado
    } catch (error) {
        console.error('Error editing PDF document:', error);
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
    }
};

// Eliminar un documento PDF asociado a una reserva por su ID
const deletePdfOne = async (reservationId) => {
    try {
        const response = await axios.delete(`${PDFONE_API_URL}${reservationId}/delete`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data; // Devolver la respuesta de eliminación
    } catch (error) {
        console.error('Error deleting PDF document:', error);
        throw error;
    }
};

// Exportar todas las funciones como un objeto
export default {
    getPdfOneByReservationId,
    addPdfOne,
    editPdfOne,
    deletePdfOne,
};
