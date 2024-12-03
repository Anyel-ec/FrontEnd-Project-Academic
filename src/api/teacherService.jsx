import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import Teacher from '../models/Teacher';

const TEACHER_API_URL = `${AppEnvironments.baseUrl}api/v1/docentes/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getTeachersByCareer = async (careerId) => {
    try {
        const response = await axios.get(`${TEACHER_API_URL}carrera/${careerId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener docentes por carrera:', error);
        throw error;
    }
};
const getTeachers = async () => {
    try {
        const response = await axios.get(TEACHER_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data.map((teacherData) => new Teacher(
            teacherData.id,
            teacherData.dni,
            teacherData.firstNames,
            teacherData.lastName,
            teacherData.middleName,
            teacherData.birthDate,
            teacherData.institutionalEmail,
            teacherData.phone,
            teacherData.address,
            teacherData.career
        ));
    } catch (error) {
        // console.error(response.data.message)
        console.error("Error fetching teachers", error);
        throw error;
    }
};

const addTeacher = async (teacher) => {
    try {
        const response = await axios.post(TEACHER_API_URL, teacher, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return new Teacher(
            response.data.id,
            response.data.dni,
            response.data.firstNames,
            response.data.lastName,
            response.data.middleName,
            response.data.birthDate,
            response.data.institutionalEmail,
            response.data.phone,
            response.data.address,
            response.data.career
        );
    } catch (error) {
        console.error("Error adding teacher", error);
        throw error;
    }
};

const editTeacher = async (id, teacher) => {
    try {
        const response = await axios.put(`${TEACHER_API_URL}${id}`, teacher, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return new Teacher(
            response.data.id,
            response.data.dni,
            response.data.firstNames,
            response.data.lastName,
            response.data.middleName,
            response.data.birthDate,
            response.data.institutionalEmail,
            response.data.phone,
            response.data.address,
            response.data.career
        );
    } catch (error) {
        console.error("Error editing teacher", error);
        throw error;
    }
};

const deleteTeacher = async (id) => {
    try {
        const response = await axios.delete(`${TEACHER_API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting teacher", error);
        throw error;
    }
};

export default {
    getTeachers,
    getTeachersByCareer, // Nuevo servicio agregado
    addTeacher,
    editTeacher,
    deleteTeacher
};
