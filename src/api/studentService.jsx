import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import Student from '../models/Student';

const STUDENT_API_URL = `${AppEnvironments.baseUrl}api/v1/alumnos/`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getStudents = async () => {
    try {
        const response = await axios.get(STUDENT_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data.map(
            (studentData) =>
                new Student(
                    studentData.id,
                    studentData.studentCode,
                    studentData.dni,
                    studentData.firstNames,
                    studentData.lastName,
                    studentData.career,
                    studentData.middleName,
                    studentData.birthDate,
                    studentData.email,
                    studentData.phone,
                    studentData.address,
                    studentData.gender
                )
        );
    } catch (error) {
        console.error('Error fetching students', error);
        throw error;
    }
};

const addStudent = async (student) => {
    try {
        const response = await axios.post(STUDENT_API_URL, student, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return new Student(
            response.data.id,
            response.data.studentCode,
            response.data.dni,
            response.data.firstNames,
            response.data.lastName,
            response.data.career,
            response.data.middleName,
            response.data.birthDate,
            response.data.email,
            response.data.phone,
            response.data.address,
            response.data.gender
        );
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
    }
};

const editStudent = async (id, student) => {
    try {
        const response = await axios.put(`${STUDENT_API_URL}${id}`, student, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return new Student(
            response.data.id,
            response.data.studentCode,
            response.data.dni,
            response.data.firstNames,
            response.data.lastName,
            response.data.career,
            response.data.middleName,
            response.data.birthDate,
            response.data.email,
            response.data.phone,
            response.data.address,
            response.data.gender
        );
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Duplicidad de datos: ' + error.response.data.message);
        }
        throw error;
    }
};

const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${STUDENT_API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting student', error);
        throw error;
    }
};

export default {
    getStudents,
    addStudent,
    editStudent,
    deleteStudent,
};
