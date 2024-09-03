import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import ThesisAdvisory from '../models/ThesisAdvisory';

const ADVISORY_API_URL = `${AppEnvironments.baseUrl}api/v1/thesis-advisories/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAllAdvisories = async () => {
    try {
        const response = await axios.get(ADVISORY_API_URL, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data.map((advisoryData) => new ThesisAdvisory(
            advisoryData.id,
            advisoryData.coAdviser,
            advisoryData.thesisTitle,
            new Date(advisoryData.startDate),
            advisoryData.extensionDate ? new Date(advisoryData.extensionDate) : null,
            new Date(advisoryData.endDate),
            advisoryData.teacherCareer,
            advisoryData.studentCareer
        ));
    } catch (error) {
        console.error("Error fetching advisories", error);
        throw error;
    }
};

const addAdvisory = async (advisory) => {
    try {
        const response = await axios.post(ADVISORY_API_URL, advisory, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return new ThesisAdvisory(
            response.data.id,
            response.data.coAdviser,
            response.data.thesisTitle,
            new Date(response.data.startDate),
            response.data.extensionDate ? new Date(response.data.extensionDate) : null,
            new Date(response.data.endDate),
            response.data.teacherCareer,
            response.data.studentCareer
        );
    } catch (error) {
        console.error("Error adding advisory", error);
        throw error;
    }
};

const editAdvisory = async (id, advisory) => {
    try {
        const response = await axios.put(`${ADVISORY_API_URL}${id}`, advisory, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return new ThesisAdvisory(
            response.data.id,
            response.data.coAdviser,
            response.data.thesisTitle,
            new Date(response.data.startDate),
            response.data.extensionDate ? new Date(response.data.extensionDate) : null,
            new Date(response.data.endDate),
            response.data.teacherCareer,
            response.data.studentCareer
        );
    } catch (error) {
        console.error("Error editing advisory", error);
        throw error;
    }
};

const deleteAdvisory = async (id) => {
    try {
        const response = await axios.delete(`${ADVISORY_API_URL}${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting advisory", error);
        throw error;
    }
};

export default {
    getAllAdvisories,
    addAdvisory,
    editAdvisory,
    deleteAdvisory
};
