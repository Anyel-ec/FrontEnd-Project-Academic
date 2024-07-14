// src/api/studentService.js

import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import Student from '../models/Student';

const STUDENT_API_URL = `${AppEnvironments.baseUrl}api/v1/alumnos/`;

const getStudents = async () => {
    try {
        const response = await axios.get(STUDENT_API_URL);
        return response.data.map((studentData) => new Student(
            studentData.id,
            studentData.studentCode,
            studentData.dni,
            studentData.firstNames,
            studentData.lastName,
            studentData.middleName,
            studentData.birthDate,
            studentData.email,
            studentData.phone,
            studentData.address
        ));
    } catch (error) {
        console.error("Error fetching students", error);
        throw error;
    }
};

export default {
    getStudents,
};
