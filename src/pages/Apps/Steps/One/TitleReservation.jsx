import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconLoader from '../../../../components/Icon/IconLoader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import careerService from '../../../../api/careerService';
import lineResearchService from '../../../../api/LineResearchService';
import studentService from '../../../../api/studentService';
import titleReservationsService from '../../../../api/titleReservationsService';
import SelectCareer from './SelectCareer';
import MultiSelectStudent from './MultiSelectStudent';
import ReservationTable from './ReservationTable';
import ReservationModal from './ReservationModal';
import IconSearch from '../../../../components/Icon/IconSearch';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null); // If it's supposed to hold a single object or initial value.
    const [lineOptions, setLineOptions] = useState([]); // Opciones de líneas de investigación (agregar si es necesario)
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [editingReservation, setEditingReservation] = useState(null);
    const [addContactModal, setAddContactModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Constancia de Filtro'));
        fetchCareers();
        fetchStudents();
        fetchTitleReservations();
    }, [dispatch]);

    // Fetch de estudiantes
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

    // Fetch de reservaciones de títulos
    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            setTitleReservations(reservations);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [studentOptions]);

    // Fetch de carreras
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

    // Filtrar estudiantes según las reservaciones actuales
    const filterStudents = (students) => {
        const reservedStudentIds = titleReservations.map((reservation) => reservation.student.id);
        const filtered = students.filter((student) => !reservedStudentIds.includes(parseInt(student.value)));
        setFilteredStudentOptions(filtered);
    };

    // Filtrar estudiantes según la carrera seleccionada
    const filterStudentsByCareer = (careerId) => {
        if (!careerId) {
            setFilteredStudentOptions([]);
            setLineOptions([]);
        } else {
            const reservedStudentIds = new Set(
                titleReservations.flatMap((reservation) => [reservation.student.id.toString(), reservation.studentTwo ? reservation.studentTwo.id.toString() : null].filter(Boolean))
            );
            const filteredByCareer = studentOptions.filter((student) => student.careerId === careerId && !reservedStudentIds.has(student.value));
            setFilteredStudentOptions(filteredByCareer);
            fetchResearchLines(careerId);
        }
    };

    const addTitleReservations = async (selectedStudents) => {
        setIsLoading(true);
        setIsDisabled(true);
        try {
            const titleReservationData = {
                student: { id: selectedStudents[0].value },
                studentTwo: selectedStudents.length > 1 ? { id: selectedStudents[1].value } : undefined,
            };
            const response = await titleReservationsService.addTitleReservation(titleReservationData);
            if (!response) {
                Swal.fire('Error', 'Error al agregar la Reservación ', 'error');
            } else {
                Swal.fire('Éxito', 'Reservación agregada satisfactoriamente', 'success');
                await fetchTitleReservations();
            }
        } catch (error) {
            if (error.response && error.response.data.includes('Ya existe una reserva con este título')) {
                Swal.fire('Error', error.response.data, 'error');
            } else {
                Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
            }
        } finally {
            setIsLoading(false);
            setIsDisabled(false);
        }
    };

    // Eliminar reservación
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

    const fetchResearchLines = useCallback(async (careerId) => {
        try {
            const researchLines = await lineResearchService.getResearchLinesByCareer(careerId); // Cambiar a lineResearchService
            const options = researchLines.map((line) => ({
                value: line.id,
                label: line.nombre_linea_investigacion,
            }));
            setLineOptions(options);
            setApiError(null);
        } catch (error) {
            if (error.message === 'Network Error') {
                console.error('Error de red: No se pudo conectar con el servidor.');
                setApiError('No se pudo conectar con el servidor. Verifica tu conexión.');
            } else {
                console.error('Error en la llamada a la API:', error);
                setApiError('Error al cargar las líneas de investigación.');
            }
        }
    }, []);

    const handleSaveReservation = async (reservationId, values) => {
        let title;
        let registrationNumber;
        try {
            const titleReservationData = {
                meetsRequirements: values?.meetRequirements === 'yes',
                observations: values.observation || '',
                title: values.title || '',
                registrationNumber: values.registrationNumber || 'N/A',
                projectSimilarity: parseFloat(values.projectSimilarity) || 0,
                lineOfResearch: values.lineOfResearch ? { id: values.lineOfResearch.value } : null,
            };

            title = titleReservationData.title;

            if (values?.meetRequirements === 'yes') {
                Swal.fire({
                    html: `
                        <div style="font-size: 5rem; margin: 0; color: orange;">&#9888;</div>
                        <span style="color: #000; margin-bottom: 0.25rem; font-weight: bold; font-size: 1.5rem;">Atención</span>
                        <p style="font-size: 1rem; text-align: center;">
                            Esta acción es irreversible, no puede ser modificada después de enviarse.
                        </p>
                    `,
                    iconColor: '#f39c12',
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    willClose: async () => {
                        const result = await Swal.fire({
                            title: 'Confirmar Reservación',
                            text: '¿Quieres aceptar la reservación del título?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                        });

                        if (result.isConfirmed) {
                            try {
                                const response = await titleReservationsService.editTitleReservation(reservationId, titleReservationData);

                                if (!response) {
                                    Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Reservación Aceptada',
                                        text: 'La reservación ha sido aceptada con éxito. Esta acción es irreversible.',
                                        timer: 3000,
                                        showConfirmButton: false,
                                    });
                                    await fetchTitleReservations(); // Actualizar lista de reservaciones
                                    closeModal(); // Cerrar el modal automáticamente después de la actualización
                                }
                            } catch (error) {
                                Swal.fire('Error', 'Error inesperado: ' + error.message, 'error');
                            }
                        } else if (result.isDismissed) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Reservación Cancelada',
                                text: 'La reservación ha sido cancelada.',
                                timer: 3000,
                                showConfirmButton: false,
                            });
                        }
                    },
                });
            } else {
                const response = await titleReservationsService.editTitleReservation(reservationId, titleReservationData);
                if (!response) {
                    Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
                } else {
                    Swal.fire('Éxito', 'Reservación actualizada correctamente', 'success');
                    await fetchTitleReservations();
                    closeModal();
                }
                console.log(titleReservationData.title);
            }
        } catch (error) {
            if (error.response && error.response.data.includes('Ya existe una reserva con este título')) {
                Swal.fire('Error', `${error.response.data}: ${title}`, 'error');
            } else {
                Swal.fire('Duplicidad', `Ya existe el título de proyecto "${title}"`, 'error');
            }
        }
    };

    // Editar reservación
    const editReservation = (reservation) => {
        const careerId = reservation.student.career.id;
        fetchResearchLines(careerId);
        setEditingReservation(reservation);
        setAddContactModal(true);
    };

    // Cerrar el modal
    const closeModal = () => {
        setAddContactModal(false);
        setEditingReservation(null);
    };

    return (
        <>
            <h2 className="text-2xl font-bold ">Constancia de Filtro</h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className=""></div>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por DNI, código y nombre"
                            className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary" aria-label="Buscar">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{
                    career: editingReservation ? editingReservation.career : null,
                    students: editingReservation ? editingReservation.students : [],
                }}
                validationSchema={Yup.object().shape({
                    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
                    students: Yup.array().min(1, 'Debes seleccionar al menos un estudiante').max(2, 'Solo puedes seleccionar hasta dos estudiantes'),
                })}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const selectedStudents = values.students;
                    if (selectedStudents.length > 0) {
                        if (editingReservation) {
                            handleSaveReservation(editingReservation.id, values)
                                .then(() => {
                                    resetForm();
                                    setSubmitting(false);
                                    setEditingReservation(null);
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
                            onChange={setSelectedCareer}
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
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded hover:bg-blue-700"
                            disabled={isSubmitting || isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">Guardando</span>
                                    <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:ml-2 rtl:mr-2 shrink-0" />
                                </div>
                            ) : (
                                'Guardar'
                            )}
                        </button>
                    </Form>
                )}
            </Formik>

            <ReservationModal
                isOpen={addContactModal}
                onClose={closeModal}
                reservation={editingReservation}
                onSave={handleSaveReservation}
                lineOptions={lineOptions}
                enableReinitialize
            />

            <ReservationTable
                selectedCareer={selectedCareer}
                titleReservations={titleReservations}
                apiError={apiError}
                onEdit={editReservation}
                onDelete={deleteTitleReservation}
                searchTerm={searchTerm}
            />
        </>
    );
};

export default TitleReservation;
