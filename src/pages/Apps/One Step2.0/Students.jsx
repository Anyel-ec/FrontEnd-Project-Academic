import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import careerService from '../../../api/careerService';
import studentService from '../../../api/studentService';
import titleReservationsService from '../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';
import ReservationModal from './ReservationModal'; // Importamos el modal

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la apertura del modal

    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));
        fetchCareers();
        fetchStudents();
        fetchTitleReservations();
    }, [dispatch]);

    const fetchStudents = useCallback(async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map((student) => ({
                value: `${student.id}`,
                label: `${student.studentCode} - ${student.firstNames ?? ''} ${student.lastName ?? ''}`,
                careerId: student.career ? student.career.id : null,
                data: student,
            }));
            setStudentOptions(options);
            filterStudents(options); // Filtra los estudiantes según las reservaciones
            setApiError(null);
        } catch (error) {
            console.error('Error fetching students:', error);
            setApiError('Error al cargar los estudiantes.');
        }
    }, []);

    const fetchTitleReservations = async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            setTitleReservations(reservations);
            setApiError(null);
        } catch (error) {
            console.error('Error fetching title reservations:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    };

    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
            setApiError(null);
        } catch (error) {
            console.error('Error fetching careers:', error);
            setApiError('Error al cargar las carreras.');
        }
    }, []);

    const filterStudents = (students) => {
        const reservedStudentIds = titleReservations.map((reservation) => reservation.student.id);
        const filtered = students.filter((student) => !reservedStudentIds.includes(parseInt(student.value)));
        setFilteredStudentOptions(filtered);
    };

    const addTitleReservation = async (studentId) => {
        try {
            const newReservation = await titleReservationsService.addTitleReservation({
                student: { id: studentId },
                project: true, // Puedes cambiar esto según el estado de tu proyecto
            });
            if (!newReservation) throw new Error('No se recibió una nueva reservación.');

            await fetchTitleReservations(); // Actualiza las reservaciones

            const updatedStudentList = studentOptions.filter((student) => student.value !== String(studentId));
            setFilteredStudentOptions(updatedStudentList);

            setApiError(null);
        } catch (error) {
            console.error('Error adding title reservation:', error);
            setApiError('Error al agregar la reservación.');
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>

            {/* Botón para abrir el modal */}
            <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
            >
                Agregar Reservación
            </button>

            {/* Componente de la tabla */}
            <ReservationTable titleReservations={titleReservations} apiError={apiError} />

            {/* Modal para agregar reservación */}
            <ReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}  // Cierra el modal
                careerOptions={careerOptions}
                filteredStudentOptions={filteredStudentOptions}
                addTitleReservation={addTitleReservation}
            />
        </div>
    );
};

export default TitleReservation;
