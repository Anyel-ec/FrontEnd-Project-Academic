import { useState, useEffect, useCallback } from 'react';
import careerService from '../../../../api/careerService';
import studentService from '../../../../api/studentService';
import titleReservationsService from '../../../../api/titleReservationsService';

// Hook para manejar las carreras
export const useCareers = () => {
    const [careerOptions, setCareerOptions] = useState([]);
    const [careerError, setCareerError] = useState(null);

    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map(career => ({
                value: career.id,
                label: career.name,
            }));
            setCareerOptions(options);
            setCareerError(null);
        } catch (error) {
            console.error('Error fetching careers:', error);
            setCareerError('Error al cargar las carreras, inténtelo de nuevo más tarde.');
        }
    }, []);

    useEffect(() => {
        fetchCareers();
    }, [fetchCareers]);

    return { careerOptions, careerError };
};

// Hook para manejar los estudiantes
export const useStudents = () => {
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [studentError, setStudentError] = useState(null);

    const fetchStudents = useCallback(async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map(student => ({
                value: `${student.id}`,
                label: `${student.studentCode} - ${student.firstNames} ${student.lastName}`,
                careerId: student.career ? student.career.id : null,
            }));
            setStudentOptions(options);
            setFilteredStudentOptions(options); // Al principio, todos los estudiantes están disponibles
            setStudentError(null);
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudentError('Error al cargar los estudiantes, inténtelo de nuevo más tarde.');
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const filterStudentsByCareer = (careerId) => {
        const filtered = studentOptions.filter(student => student.careerId === careerId);
        setFilteredStudentOptions(filtered);
    };

    return { studentOptions, filteredStudentOptions, studentError, filterStudentsByCareer };
};

// Hook para manejar las reservaciones de título
export const useTitleReservations = () => {
    const [titleReservations, setTitleReservations] = useState([]);
    const [reservationError, setReservationError] = useState(null);

    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            setTitleReservations(reservations);
            setReservationError(null);
        } catch (error) {
            console.error('Error fetching title reservations:', error);
            setReservationError('Error al cargar las reservaciones de títulos.');
        }
    }, []);

    useEffect(() => {
        fetchTitleReservations();
    }, [fetchTitleReservations]);

    return { titleReservations, reservationError };
};
