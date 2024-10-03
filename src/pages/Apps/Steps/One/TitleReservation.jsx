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
// import { HandleMode } from '../../styles/selectStyles';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [currentEditReservation, setCurrentEditReservation] = useState(null); // Reservación que se está editando

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
            filterStudents(options);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener los estudiantes:', error);
            setApiError('Error al cargar los estudiantes.');
        }
    }, [titleReservations]);

    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            setTitleReservations(reservations);
            updateFilteredStudents();
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [studentOptions]);

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
                Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
            } else {
                Swal.fire('Exito', 'Reservación actualizada correctamente', 'success');
                await fetchTitleReservations();
            }
        } catch (error) {
            Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
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
            setApiError('Error al cargar las carreras.');
        }
    }, []);

    const filterStudents = (students) => {
        const reservedStudentIds = titleReservations.map((reservation) => reservation.student.id);
        const filtered = students.filter((student) => !reservedStudentIds.includes(parseInt(student.value)));
        setFilteredStudentOptions(filtered);
    };

    const filterStudentsByCareer = (careerId) => {
        if (!careerId) {
            setFilteredStudentOptions([]);
        } else {
            const reservedStudentIds = new Set(titleReservations.flatMap(reservation => [
                reservation.student.id.toString(),
                reservation.studentTwo ? reservation.studentTwo.id.toString() : null
            ].filter(Boolean)));
    
            const filteredByCareer = studentOptions.filter(student => 
                student.careerId === careerId && !reservedStudentIds.has(student.value)
            );
            setFilteredStudentOptions(filteredByCareer);
        }
    };

    const addTitleReservations = async (selectedStudents) => {
        try {
            const titleReservationData = {
                student: { id: selectedStudents[0].value },
                studentTwo: selectedStudents.length > 1 ? { id: selectedStudents[1].value } : undefined,
            };

            const response = await titleReservationsService.addTitleReservation(titleReservationData);
            if (!response) {
                Swal.fire('Error', 'Error al agregar la Reservación ', 'error');
            } else {
                Swal.fire('Exito', 'Reservación agregada satisfactoriamente', 'exito');
                await fetchTitleReservations();
            }
        } catch (error) {
            Swal.fire('Error', 'Unexpected error: ' + error.message, 'error');
        }
    };

    const updateFilteredStudents = () => {
        const reservedStudentIds = new Set(titleReservations.flatMap(reservation => [
            reservation.student.id.toString(),
            reservation.studentTwo ? reservation.studentTwo.id.toString() : ''
        ].filter(Boolean)));
        const filtered = studentOptions.filter(option => !reservedStudentIds.has(option.value));
        setFilteredStudentOptions(filtered);
    };

    useEffect(() => {
        if (titleReservations.length > 0 || studentOptions.length > 0) {
            updateFilteredStudents();
        }
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
                await fetchTitleReservations();
                filterStudents(studentOptions);
                Swal.fire('Eliminado!', 'La reservación ha sido eliminada exitosamente.', 'success');
            } catch (error) {
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
                validationSchema={Yup.object().shape({
                    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
                    students: Yup.array().min(1, 'Debes seleccionar al menos un estudiante').max(2, 'Solo puedes seleccionar hasta dos estudiantes'),
                })}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const selectedStudents = values.students;

                    if (selectedStudents.length > 0) {
                        if (currentEditReservation) {
                            updateTitleReservation(currentEditReservation.id, selectedStudents)
                                .then(() => {
                                    resetForm();
                                    setSubmitting(false);
                                    setCurrentEditReservation(null);
                                })
                                .catch(() => setSubmitting(false));
                        } else {
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
                            maxSelectable={2}
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
                onEdit={handleEditReservation}
                onDelete={deleteTitleReservation}
            />
        </div>
    );
};

export default TitleReservation;
