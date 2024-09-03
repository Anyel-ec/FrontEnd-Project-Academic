import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import StudentCareer from '../models/StudentCareer';

const STUDENT_CAREER_API_URL = `${AppEnvironments.baseUrl}api/v1/alumno_carrera/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const addStudentCareer = async (studentCareer) => {
    try {
        const response = await axios.post(STUDENT_CAREER_API_URL, studentCareer, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error assigning student to career", error);
        throw error;
    }
};

const getStudentCareers = async () => {
    try {
        const response = await axios.get(STUDENT_CAREER_API_URL, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching student careers", error);
        throw error;
    }
};

const updateStudentCareer = async (id, studentCareer) => {
    try {
        const response = await axios.put(`${STUDENT_CAREER_API_URL}${id}`, studentCareer, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating student career", error);
        throw error;
    }
};

const deleteStudentCareer = async (id) => {
    try {
        const response = await axios.delete(`${STUDENT_CAREER_API_URL}${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting student career", error);
        throw error;
    }
};

const getStudentCareersByCareer = async (careerId) => {
    try {
        const response = await axios.get(`${STUDENT_CAREER_API_URL}carrera/${careerId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching student careers by career", error);
        throw error;
    }
};

export default {
    addStudentCareer,
    getStudentCareers,
    updateStudentCareer,
    deleteStudentCareer,
    getStudentCareersByCareer
};
