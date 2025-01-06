import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const CONSTANCYTHESIS_API_URL = `${AppEnvironments.baseUrl}api/v1/constancia_tesis`;
const PDF_API_URL = `${AppEnvironments.baseUrl}api/v1/pdfDocument/StepFive`;
const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Métodos para la gestión de constancias de tesis
const getAllConstancyThesis = async () => {
    try {
        const response = await axios.get(CONSTANCYTHESIS_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching constancy thesis', error);
        throw error;
    }
};
const getConstancyByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${CONSTANCYTHESIS_API_URL}/student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};
const editConstancyThesis = async (id, constancyThesis) => {
    try {
        const response = await axios.put(`${CONSTANCYTHESIS_API_URL}/${id}`, constancyThesis, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error in edit constancy thesis', error);
        throw error;
    }
};

const deleteConstancyThesis = async (id) => {
    try {
        const response = await axios.delete(`${CONSTANCYTHESIS_API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error in delete constancy thesis', error);
        throw error;
    }
};

const uploadPdfDocument = async (id, pdfData) => {
    if (!id) {
        console.error('ID is undefined!');
        return;
    }
    try {
        const response = await axios.post(`${PDF_API_URL}/${id}/upload`, {pdfData}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error uploading PDF document', error);
        throw error;
    }
};

const checkPdfExists = async (id) => {
    try {
        const response = await axios.get(`${PDF_API_URL}/${id}/exists`, getAuthHeaders());
        return response.data.exists;
    } catch (error) {
        console.error('Error checking if PDF exists', error);
        throw error;
    }
};

const viewPdfDocument = async (id) => {
    try {
        const response = await axios.get(`${PDF_API_URL}/${id}/view`, getAuthHeaders());
        return response.data.pdfData;
    } catch (error) {
        console.error('Error viewing PDF document', error);
        throw error;
    }
};

const deletePdfDocument = async (id) => {
    try {
        const response = await axios.delete(`${PDF_API_URL}/${id}/delete`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error deleting PDF document', error);
        throw error;
    }
};

// Exportar todos los métodos
export default {
    getAllConstancyThesis,
    editConstancyThesis,
    getConstancyByStudentCode,
    deleteConstancyThesis,
    uploadPdfDocument,
    checkPdfExists,
    viewPdfDocument,
    deletePdfDocument,
};
