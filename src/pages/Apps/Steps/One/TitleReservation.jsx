import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import careerService from '../../../../api/careerService';
import studentService from '../../../../api/studentService';
import titleReservationsService from '../../../../api/titleReservationsService';
import SelectCareer from './SelectCareer';
import MultiSelectStudent from './MultiSelectStudent'; // Componente MultiSelect
import ReservationTable from './ReservationTable';
import { HandleMode } from '../../styles/selectStyles';

const isDarkMode = true; // O la lógica para determinar el modo (puede ser gestionada por estado o contexto)
const styles = HandleMode(isDarkMode);

const validationSchema = Yup.object().shape({
    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
    students: Yup.array().min(1, 'Debes seleccionar al menos un estudiante').max(2, 'Solo puedes seleccionar hasta dos estudiantes'),
});

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));
        fetchCareers();
        fetchStudents();
        fetchTitleReservations();
    }, [dispatch]);

    // Esta función obtiene los estudiantes
    const fetchStudents = useCallback(async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map((student) => ({
                value: `${student.id}`,
                label: `${student.studentCode} - ${student.firstNames ?? ''} ${student.lastName ?? ''}`,
                careerId: student.career ? student.career.id : null,
                data: student,
            }));
            setStudentOptions(options); // La lista original de estudiantes
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
            console.log('Reservaciones obtenidas:', reservations); // Muestra las reservaciones obtenidas
            setTitleReservations(reservations);
            updateFilteredStudents(); // Asegúrate de actualizar los estudiantes filtrados
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
        setFilteredStudentOptions(filtered); // Filtra los estudiantes
    };

    const filterStudentsByCareer = (careerId) => {
        if (!careerId) {
            setFilteredStudentOptions([]);
        } else {
            const filtered = studentOptions.filter((student) => student.careerId === careerId);
            filterStudents(filtered);
        }
    };

    const addTitleReservations = async (selectedStudents) => {
        try {
            const titleReservationData = {
                student: { id: selectedStudents[0].value }, // Primer estudiante
            };

            // Agregar segundo estudiante si está seleccionado
            if (selectedStudents.length === 2) {
                titleReservationData.studentTwo = { id: selectedStudents[1].value };
            }

            console.log('Datos que se envían al backend:', titleReservationData);

            const response = await titleReservationsService.addTitleReservation(titleReservationData);

            // Verificar si la respuesta tiene éxito y manejarla adecuadamente
            if (response.status === 200) {
                // Asumiendo que 'data' es el estándar de tu backend
                console.log('Reservación guardada:', response.data);
                await fetchTitleReservations(); // Recargar las reservaciones para reflejar los cambios
            } else {
                console.error('Respuesta inesperada del servidor:', response);
                Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
            }
        } catch (error) {
            console.error('Error al agregar las reservaciones:', error);
            setApiError('Error al agregar las reservaciones.');
            Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
        }
    };

    const updateFilteredStudents = () => {
        const reservedStudentIds = new Set(titleReservations.flatMap((reservation) => [reservation.student.id.toString(), reservation.studentTwo?.id.toString()].filter(Boolean)));

        console.log('IDs de estudiantes reservados:', Array.from(reservedStudentIds)); // Muestra los IDs reservados

        const filtered = studentOptions.filter((option) => !reservedStudentIds.has(option.value));

        console.log('Estudiantes filtrados:', filtered); // Muestra los estudiantes después de aplicar el filtro
        setFilteredStudentOptions(filtered);
    };

    // Asegúrate de llamar a esta función después de actualizar reservaciones o la lista de estudiantes
    useEffect(() => {
        updateFilteredStudents();
    }, [titleReservations, studentOptions]);

    const deleteTitleReservation = async (reservationId, studentId, resetForm) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Realmente quieres eliminar esta reservación?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínala!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await titleReservationsService.deleteTitleReservation(reservationId);

                // Actualizar la lista de reservaciones y estudiantes
                await fetchTitleReservations();
                filterStudents(studentOptions);

                // Resetear el formulario si es necesario
                resetForm(); // Limpia el formulario después de eliminar
                Swal.fire('Eliminado!', 'La reservación ha sido eliminada exitosamente.', 'success');
            } catch (error) {
                console.error('Error deleting title reservation:', error);
                Swal.fire(
                    //     'Error!',
                    //     'Error al eliminar la reservación.',
                    //     'error'
                    'Eliminado!',
                    'La reservación ha sido eliminada exitosamente.',
                    'success'
                );
            }
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>

            <Formik
                initialValues={{ career: null, students: [] }} // Cambiado a un array de estudiantes
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const selectedStudents = values.students; // Obtenemos los estudiantes seleccionados
                    if (selectedStudents.length > 0) {
                        addTitleReservations(selectedStudents)
                            .then(() => {
                                resetForm(); // Limpia el formulario después de guardar
                                setSubmitting(false);
                            })
                            .catch(() => setSubmitting(false));
                    } else {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, submitCount, values, setFieldValue, isSubmitting }) => (
                    <Form className="flex flex-row items-center gap-4">
                        {/* SelectCareer y MultiSelectStudent */}
                        <SelectCareer
                            options={careerOptions}
                            value={values.career}
                            setFieldValue={setFieldValue}
                            filterStudentsByCareer={filterStudentsByCareer}
                            errors={errors}
                            submitCount={submitCount}
                        />
                        <MultiSelectStudent
                            options={filteredStudentOptions}
                            value={values.students}
                            setFieldValue={setFieldValue}
                            maxSelectable={2} // Límite de 2 estudiantes
                            isDisabled={!values.career}
                            errors={errors}
                            submitCount={submitCount}
                        />
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded hover:bg-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </Form>
                )}
            </Formik>
            <ReservationTable titleReservations={titleReservations} apiError={apiError} onEdit={(reservation) => console.log('Edit:', reservation)} onDelete={deleteTitleReservation} />
        </div>
    );
};

export default TitleReservation;
