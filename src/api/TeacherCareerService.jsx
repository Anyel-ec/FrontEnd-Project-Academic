import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const TEACHER_CAREER_API_URL = `${AppEnvironments.baseUrl}api/v1/docente_carrera/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const addTeacherCareer = async (teacherCareer) => {
    try {
        const response = await axios.post(TEACHER_CAREER_API_URL, teacherCareer, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error assigning teacher to career", error);
        throw error;
    }
};

const getTeacherCareer = async () => {
    try {
        const response = await axios.get(TEACHER_CAREER_API_URL, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching teacher careers", error);
        throw error;
    }
};

const updateTeacherCareer = async (id, teacherCareer) => {
    try {
        const response = await axios.put(`${TEACHER_CAREER_API_URL}${id}`, teacherCareer, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating teacher career", error);
        throw error;
    }
};

const deleteTeacherCareer = async (id) => {
    try {
        const response = await axios.delete(`${TEACHER_CAREER_API_URL}${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting teacher from career", error);
        throw error;
    }
};

export default {
    addTeacherCareer,
    getTeacherCareer,
    updateTeacherCareer,
    deleteTeacherCareer
};
