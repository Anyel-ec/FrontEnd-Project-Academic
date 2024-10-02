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

const isDarkMode = true; // Lógica para determinar el modo oscuro (puede ser gestionada por estado o contexto)
const styles = HandleMode(isDarkMode);

// Validación con Yup para el formulario
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
    const [currentEditReservation, setCurrentEditReservation] = useState(null); // Reservación que se está editando

    // Fetch de carreras, estudiantes y reservaciones al montar el componente
    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));
        fetchCareers();
        fetchStudents();
        fetchTitleReservations();
    }, [dispatch]);

    // Fetch para obtener los estudiantes
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
            console.error('Error al obtener los estudiantes:', error);
            setApiError('Error al cargar los estudiantes.');
        }
    }, [titleReservations]); // Dependencia para filtrar los estudiantes una vez que las reservaciones son obtenidas

    // Fetch para obtener las reservaciones de título
    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            console.log('Reservaciones obtenidas:', reservations); // Muestra las reservaciones obtenidas
            setTitleReservations(reservations);
            updateFilteredStudents(); // Asegúrate de actualizar los estudiantes filtrados
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [studentOptions]); // Dependencia de los estudiantes
    const handleEditReservation = (reservation) => {
        const selectedStudents = [{ value: reservation.student.id, label: `${reservation.student.studentCode} - ${reservation.student.firstNames} ${reservation.student.lastName}` }];

        if (reservation.studentTwo) {
            selectedStudents.push({
                value: reservation.studentTwo.id,
                label: `${reservation.studentTwo.studentCode} - ${reservation.studentTwo.firstNames} ${reservation.studentTwo.lastName}`,
            });
        }

        setCurrentEditReservation({
            id: reservation.id,
            career: careerOptions.find((career) => career.value === reservation.career.id),
            students: selectedStudents,
        });
    };
    const updateTitleReservation = async (reservationId, selectedStudents) => {
        try {
            const titleReservationData = {
                student: { id: selectedStudents[0].value },
            };

            if (selectedStudents.length === 2) {
                titleReservationData.studentTwo = { id: selectedStudents[1].value };
            }

            const response = await titleReservationsService.updateTitleReservation(reservationId, titleReservationData);

            if (!response) {
                console.error('Respuesta inesperada del servidor:', response);
                Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
            } else {
                Swal.fire('Exito', 'Reservación actualizada correctamente', 'success');
                await fetchTitleReservations(); // Recargar las reservaciones para reflejar los cambios
            }
        } catch (error) {
            console.error('Error al actualizar la reservación:', error);
            Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
        }
    };

    // Fetch para obtener las carreras
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
            console.error('Error al obtener las carreras:', error);
            setApiError('Error al cargar las carreras.');
        }
    }, []);

    // Filtra los estudiantes que ya tienen reservaciones
    const filterStudents = (students) => {
        const reservedStudentIds = titleReservations.map((reservation) => reservation.student.id);
        const filtered = students.filter((student) => !reservedStudentIds.includes(parseInt(student.value)));
        setFilteredStudentOptions(filtered); // Filtra los estudiantes
    };

    // Filtrar los estudiantes por carrera
    const filterStudentsByCareer = (careerId) => {
        if (!careerId) {
            setFilteredStudentOptions([]); // Vacía la lista si no hay carrera seleccionada
        } else {
            const filtered = studentOptions.filter((student) => student.careerId === careerId);
            filterStudents(filtered);
        }
    };
    
    // Agregar reservaciones de título
    const addTitleReservations = async (selectedStudents) => {
        try {
            const titleReservationData = {
                student: { id: selectedStudents[0].value },
            };

            // Agregar segundo estudiante si está seleccionado
            if (selectedStudents.length === 2) {
                titleReservationData.studentTwo = { id: selectedStudents[1].value };
            }
            
            console.log('Datos que se envían al backend:', titleReservationData);

            const response = await titleReservationsService.addTitleReservation(titleReservationData);

            // Verificar si la respuesta tiene éxito y manejarla adecuadamente
            if (!response) {
                console.error('Respuesta inesperada del servidor:', response);
                Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
            } else {
                Swal.fire('Error', 'Estudiante agregado correctamente', 'success');
                await fetchTitleReservations(); // Recargar las reservaciones para reflejar los cambios
            }
        } catch (error) {
            console.error('Error al agregar las reservaciones:', error);
            setApiError('Error al agregar las reservaciones.');
            Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
        }
    };

    // Actualizar los estudiantes filtrados
    const updateFilteredStudents = () => {
        const reservedStudentIds = new Set(titleReservations.flatMap((reservation) => [reservation.student.id.toString(), reservation.studentTwo?.id.toString()].filter(Boolean)));
        const filtered = studentOptions.filter((option) => !reservedStudentIds.has(option.value));
        setFilteredStudentOptions(filtered);
    };

    // Asegúrate de llamar a esta función después de actualizar reservaciones o la lista de estudiantes
    useEffect(() => {
        if (titleReservations.length > 0 || studentOptions.length > 0) {
            updateFilteredStudents();
        }
    }, [titleReservations, studentOptions]);

    // Eliminar una reservación de título
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
                Swal.fire('Eliminado!', 'La reservación ha sido eliminada exitosamente.', 'success');
            } catch (error) {
                console.error('Error al eliminar la reservación:', error);
                Swal.fire('Error', 'Error al eliminar la reservación.', 'error');
            }
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>

            <Formik
                initialValues={{
                    career: currentEditReservation ? currentEditReservation.career : null,
                    students: currentEditReservation ? currentEditReservation.students : [],
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const selectedStudents = values.students;

                    if (selectedStudents.length > 0) {
                        if (currentEditReservation) {
                            // Lógica para actualizar la reservación existente
                            updateTitleReservation(currentEditReservation.id, selectedStudents)
                                .then(() => {
                                    resetForm();
                                    setSubmitting(false);
                                    setCurrentEditReservation(null); // Salir del modo de edición
                                })
                                .catch(() => setSubmitting(false));
                        } else {
                            // Lógica para agregar nueva reservación
                            addTitleReservations(selectedStudents)
                                .then(() => {
                                    resetForm();
                                    setSubmitting(false);
                                })
                                .catch(() => setSubmitting(false));
                        }
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
            <ReservationTable
                titleReservations={titleReservations}
                apiError={apiError}
                onEdit={handleEditReservation} // Pasamos la función de edición
                onDelete={deleteTitleReservation}
            />
        </div>
    );
};

export default TitleReservation;
