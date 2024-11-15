import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const CONSTANCYTHESIS_API_URL = `${AppEnvironments.baseUrl}api/v1/constancia_tesis`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});
const getAllConstancyThesis = async () => {
    try {
        const response = await axios.get(CONSTANCYTHESIS_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching constancy thesis', error);
        throw error;
    }
};
const editConstancyThesis = async (id, constancyThesis) => {
    try {
        const response = await axios.post(`${CONSTANCYTHESIS_API_URL}/${id}`, constancyThesis, getAuthHeaders());
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
export default {
    getAllConstancyThesis,
    editConstancyThesis,
    deleteConstancyThesis,
};
