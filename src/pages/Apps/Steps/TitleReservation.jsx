import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import careerService from '../../../api/careerService';
import { setPageTitle } from '../../../store/themeConfigSlice';
import 'flatpickr/dist/flatpickr.css';
import Select from 'react-select';
import { Formik, Form, ErrorMessage } from 'formik';
import studentService from '../../../api/studentService';
import titleReservationsService from '../../../api/titleReservationsService';
import { HandleMode } from '../styles/selectStyles';
import * as Yup from 'yup';
import '../styles/toggleSwitch.css';

const validationSchema = Yup.object().shape({
    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
    student: Yup.object().nullable().required('Debes seleccionar un estudiante'),
});

const isDarkMode = true;
const styles = HandleMode(isDarkMode);

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [isStudentSelectEnabled, setIsStudentSelectEnabled] = useState(true);

    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));
        fetchCareers();
        fetchStudents();
        fetchTitleReservations();
    }, [dispatch]);

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
            setApiError('Error al cargar las carreras, inténtelo de nuevo más tarde.');
        }
    }, []);

    const fetchStudents = useCallback(async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map((student) => ({
                value: `${student.id}`,
                label: `${student.studentCode} - ${student.firstNames ?? ''} ${student.lastName ?? ''}`,
                careerId: student.career ? student.career.id : null,
                data: student,
            }));

            // Actualiza el estado de studentOptions
            setStudentOptions(options);
            filterStudents(options); // Llamar al filtro después de cargar los estudiantes
            setApiError(null);
        } catch (error) {
            console.error('Error fetching students:', error);
            setApiError('Error al cargar los estudiantes, inténtelo de nuevo más tarde.');
        }
    }, []);

    // Función para filtrar los estudiantes que ya tienen reservación
    const filterStudents = (students) => {
        // Obtener los IDs de los estudiantes que ya tienen reservaciones
        const reservedStudentIds = titleReservations.map((reservation) => reservation.student.id);

        // Filtrar los estudiantes que no están en la lista de reservaciones
        const filtered = students.filter((student) => !reservedStudentIds.includes(parseInt(student.value)));

        // Actualizar el estado con los estudiantes filtrados
        setFilteredStudentOptions(filtered);
    };

    const filterStudentsByCareer = (careerId) => {
        if (!careerId) {
            setFilteredStudentOptions([]);
        } else {
            const filtered = studentOptions.filter((student) => student.careerId === careerId);
            filterStudents(filtered);  // Aplicar el filtro de estudiantes que ya tienen reservación
        }
    };

    const handleToggleChange = () => {
        setIsStudentSelectEnabled(!isStudentSelectEnabled);
    };

    const addTitleReservation = async (studentId) => {
        try {
            console.log('Enviando ID del estudiante:', studentId);
            const newReservation = await titleReservationsService.addTitleReservation({
                student: { id: studentId },
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!newReservation) {
                throw new Error('No se recibió una nueva reservación.');
            }

            // Después de agregar la nueva reservación, vuelve a cargar las reservaciones y los estudiantes
            await fetchTitleReservations();
            await fetchStudents(); // Volver a cargar los estudiantes después de agregar una reservación

            setApiError(null);
        } catch (error) {
            console.error('Error adding title reservation:', error);
            const errorMessage = error?.response?.data?.message || 'Error al agregar la reservación de título.';
            setApiError(errorMessage);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>

            <Formik
                initialValues={{
                    career: null,
                    student: null,
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const studentId = values.student ? values.student.value : null;

                    if (studentId) {
                        addTitleReservation(studentId)
                            .then(() => {
                                resetForm();
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                console.error('Error adding reservation:', error);
                                setSubmitting(false);
                            });
                    } else {
                        setSubmitting(false);
                        console.error('No student selected');
                    }
                }}
            >
                {({ errors, submitCount, values, setFieldValue, isSubmitting }) => (
                    <Form className="flex flex-row items-center gap-4">
                        {/* Selección de Carrera */}
                        <div className={`flex-grow ${submitCount && errors.career ? 'has-error' : ''}`}>
                            <label htmlFor="career" className="block mb-1">Carrera</label>
                            <Select
                                name="career"
                                styles={styles}
                                placeholder="Selecciona una carrera"
                                options={careerOptions}
                                onChange={(option) => {
                                    setFieldValue('career', option);
                                    setFieldValue('student', null);
                                    filterStudentsByCareer(option.value); // Filtra los estudiantes según la carrera seleccionada
                                }}
                                value={values.career}
                            />
                            <ErrorMessage name="career" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Selección de Estudiante */}
                        <div className={`flex-grow ${submitCount && errors.student ? 'has-error' : ''}`}>
                            <label htmlFor="student" className="block mb-1">Estudiante</label>
                            <Select
                                name="student"
                                styles={styles}
                                placeholder="Selecciona un estudiante"
                                options={filteredStudentOptions}  // Mostrar solo estudiantes sin reservación
                                onChange={(option) => setFieldValue('student', option)}
                                value={values.student}
                                isDisabled={!values.career || !isStudentSelectEnabled}  // Habilita si hay carrera seleccionada
                            />
                            <ErrorMessage name="student" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Toggle para habilitar estudiantes */}
                        <div className="flex items-center flex-col">
                            <label htmlFor="toggleStudentSelect">Habilitar estudiantes</label>
                            <label className="switch">
                                <input type="checkbox" id="toggleStudentSelect" checked={isStudentSelectEnabled} onChange={handleToggleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        {/* Botón de envío */}
                        <div className="flex justify-items-end">
                            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded hover:bg-blue-700" disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                {apiError && <div className="text-danger">{apiError}</div>}
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cumple Requisitos</th>
                                <th>Estudiante</th>
                                <th>Proyecto</th>
                                <th>Observaciones</th>
                                <th>Fecha Creación</th>
                                <th>Fecha Actualización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {titleReservations.length > 0 ? (
                                titleReservations.map((reservation) => (
                                    <tr key={reservation.student.studentCode}>
                                        <td>{reservation.student.studentCode}</td>
                                        <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td>
                                        <td>
                                            {reservation.student.firstNames ?? ''} {reservation.student.lastName ?? ''}
                                        </td>
                                        <td>{reservation.project ? 'Sí' : 'No'}</td>
                                        <td>{reservation.observations}</td>
                                        <td>{reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString() : 'N/A'}</td>
                                        <td>{reservation.updatedAt ? new Date(reservation.updatedAt).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-2 text-center">
                                        No hay reservaciones disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TitleReservation;
