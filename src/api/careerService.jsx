import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import Career from '../models/Career';
import Faculty from '../models/Faculty';

const CAREER_API_URL = `${AppEnvironments.baseUrl}api/v1/carreras/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getCareers = async () => {
    try { 
        const response = await axios.get(CAREER_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data.map(
            (careerData) =>
                new Career(
                    careerData.id,
                    careerData.name,
                    new Faculty(careerData.faculty.id, careerData.faculty.nameFaculty)
                )
        );
    } catch (error) {
        console.error('Error fetching careers', error);
        throw error;
    }
};

export default {
    getCareers,
};
