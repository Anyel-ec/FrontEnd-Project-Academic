import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import careerService from '../../../../api/careerService';
import studentService from '../../../../api/studentService';
import titleReservationsService from '../../../../api/titleReservationsService';
import SelectCareer from './SelectCareer';
import SelectStudent from './SelectStudent';
import ReservationTable from './ReservationTable';
// import ToggleSwitch from './ToggleSwitch';
import { HandleMode } from '../../styles/selectStyles';

const isDarkMode = true; // O la lógica para determinar el modo (puede ser gestionada por estado o contexto)
const styles = HandleMode(isDarkMode);

const validationSchema = Yup.object().shape({
    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
    student: Yup.object().nullable().required('Debes seleccionar un estudiante'),
});

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [isProjectEnabled, setIsProjectEnabled] = useState(true); // Cambiamos el nombre para "project"

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

    // Función que cambia el estado del proyecto
    const handleToggleChange = () => {
        setIsProjectEnabled(!isProjectEnabled); // Alternar el valor de "project"
    };

    const addTitleReservation = async (studentId) => {
        try {
            const newReservation = await titleReservationsService.addTitleReservation({
                student: { id: studentId },
                project: isProjectEnabled, // Enviar si el proyecto está habilitado o no
            });
            if (!newReservation) throw new Error('No se recibió una nueva reservación.');

            await fetchTitleReservations(); // Actualiza las reservaciones

            // Filtrar el estudiante recién agregado para que no aparezca en el select
            const updatedStudentList = studentOptions.filter((student) => student.value !== String(studentId));
            setFilteredStudentOptions(updatedStudentList);

            setApiError(null);
        } catch (error) {
            console.error('Error adding title reservation:', error);
            setApiError('Error al agregar la reservación.');
        }
    };

    const deleteTitleReservation = async (reservationId, studentId, resetForm) => {
        try {
            await titleReservationsService.deleteTitleReservation(reservationId);
    
            // Actualizar la lista de reservaciones y estudiantes
            await fetchTitleReservations();
            filterStudents(studentOptions);
    
            // Resetear el formulario si es necesario
            resetForm(); // Limpia el formulario después de eliminar
        } catch (error) {
            // console.error('Error deleting title reservation:', error);
            setApiError('Error al eliminar la reservación.');
        }
    };
    

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>

            <Formik
                initialValues={{ career: null, student: null }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const studentId = values.student?.value;
                    if (studentId) {
                        addTitleReservation(studentId)
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
                        {/* SelectCareer y SelectStudent */}
                        <SelectCareer
                            options={careerOptions}
                            value={values.career}
                            setFieldValue={setFieldValue}
                            filterStudentsByCareer={filterStudentsByCareer}
                            errors={errors}
                            submitCount={submitCount}
                        />
                        <SelectStudent options={filteredStudentOptions} value={values.student} setFieldValue={setFieldValue} isDisabled={!values.career} errors={errors} submitCount={submitCount} />
                        {/* <ToggleSwitch isChecked={isProjectEnabled} onChange={handleToggleChange} /> */}
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
