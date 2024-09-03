import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconSearch from '../../../components/Icon/IconSearch';
import Select from 'react-select';
import studentCareerService from '../../../api/studentCareerService';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import careerService from '../../../api/careerService';
import studentService from '../../../api/studentService';

const StudentCareer = () => {
    const dispatch = useDispatch();
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [search, setSearch] = useState('');

    const validationSchema = Yup.object().shape({
        career: Yup.object().nullable().required('Seleccione una carrera'),
        student: Yup.object().nullable().required('Seleccione un estudiante'),
        project: Yup.string().oneOf(['true', 'false'], 'Seleccione una opción válida').required('Campo requerido')
    });

    useEffect(() => {
        dispatch(setPageTitle('Asignación de estudiantes a carreras'));
        fetchAssignments();
        fetchCareers();
        fetchStudents();
    }, [dispatch]);

    const fetchAssignments = async () => {
        try {
            const response = await studentCareerService.getStudentCareers();
            setAssignments(response);
        } catch (error) {
            console.error("Error fetching assignments", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener las asignaciones',
            });
        }
    };

    const fetchCareers = async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({ value: career.id, label: career.name, data: career }));
            setCareerOptions(options);
        } catch (error) {
            console.error("Error fetching careers", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map((student) => ({
                value: student.id,
                label: `${student.firstNames} ${student.lastName} - ${student.studentCode}`,
                data: student
            }));
            setStudentOptions(options);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const saveAssignment = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // Mostrar el ícono de cargando
        Swal.fire({
            title: 'Guardando...',
            text: 'Por favor espera mientras se guarda la asignación y se envía el correo.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const studentCareer = {
            student: { id: values.student.value },
            career: { id: values.career.value },
            project: values.project === 'true'

        };

        try {
            let response;
            if (editingAssignment) {
                response = await studentCareerService.updateStudentCareer(editingAssignment.id, studentCareer);
                setAssignments(assignments.map(a => (a.id === response.id ? response : a)));
                Swal.fire({
                    icon: 'success',
                    title: 'Asignación actualizada',
                    text: 'La asignación ha sido actualizada exitosamente',
                });
            } else {
                response = await studentCareerService.addStudentCareer(studentCareer);
                setAssignments([...assignments, response]);
                Swal.fire({
                    icon: 'success',
                    title: 'Asignación guardada',
                    text: 'El estudiante ha sido asignado a la carrera exitosamente',
                });
            }
            resetForm();
            setEditingAssignment(null);
            fetchAssignments(); // Reload the datatable
        } catch (error) {
            console.error("Error saving assignment:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al guardar la asignación',
            });
        }
        setSubmitting(false);
    };

    const editAssignment = (assignment) => {
        setEditingAssignment(assignment);
    };


    const deleteAssignment = async (assignmentId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente quieres eliminar esta asignación?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínala!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await studentCareerService.deleteStudentCareer(assignmentId);
                setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
                Swal.fire('¡Eliminada!', 'La asignación ha sido eliminada.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar la asignación', 'error');
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Asignación de estudiantes a carreras</h2>
                <div className="relative">
                    <input type="text" placeholder="Buscar" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                        <IconSearch className="mx-auto" />
                    </button>
                </div>
            </div>

            <Formik
                initialValues={{
                    career: editingAssignment ? { value: editingAssignment.career.id, label: editingAssignment.career.name } : null,
                    student: editingAssignment ? { value: editingAssignment.student.id, label: `${editingAssignment.student.firstNames} ${editingAssignment.student.lastName} - ${editingAssignment.student.studentCode}` } : null,
                    project: editingAssignment ? editingAssignment.project.toString() : ''
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={saveAssignment}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                    <Form className="space-y-5">
                        <div className="flex items-center justify-between mt-5 gap-4">
                            {/* Carrera */}
                            <div className="w-1/3 px-2" id="tagging">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Carrera</h5>
                                </div>
                                <div className="mb-5">
                                    <Select
                                        name="career"
                                        placeholder="Selecciona una opción"
                                        options={careerOptions}
                                        onChange={(option) => setFieldValue('career', option)}
                                        value={values.career}
                                    />
                                    <ErrorMessage name="career" component="div" className="text-danger mt-1" />
                                </div>
                            </div>

                            {/* Estudiante */}
                            <div className="w-1/3 px-2" id="tagging">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Estudiante</h5>
                                </div>
                                <div className="mb-5">
                                    <Select
                                        name="student"
                                        placeholder="Selecciona una opción"
                                        options={studentOptions}
                                        onChange={(option) => setFieldValue('student', option)}
                                        value={values.student}
                                    />
                                    <ErrorMessage name="student" component="div" className="text-danger mt-1" />
                                </div>
                            </div>
                            {/* Proyecto */}
                            <div className="w-1/3 px-2">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Proyecto de Titulación</h5>
                                </div>
                                <div className="mb-5">
                                    <Field as="select" name="project" id="project" className="form-select">
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="true">Habilitado</option>
                                        <option value="false">Deshabilitado</option>
                                    </Field>
                                    <ErrorMessage name="project" component="div" className="text-danger mt-1" />
                                </div>
                            </div>

                            {/* Botón Guardar Asignación */}
                            <div className="w-1/4 p-5 mt-5">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingAssignment ? 'Actualizar Asignación' : 'Guardar Asignación'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre Completo</th>
                                <th>Carrera</th>
                                <th>Proyecto de Fin de Carrera</th>
                                <th className="!text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => {
                                const { student, career } = assignment;
                                const fullName = `${student.firstNames} ${student.lastName} ${student.middleName}`;
                                return (
                                    <tr key={assignment.id}>
                                        <td>{student.studentCode}</td>
                                        <td>{fullName}</td>
                                        <td>{career.name}</td>
                                        <td>
                                            <span className={`badge ${assignment.project ? 'bg-success' : 'bg-danger'}`}>
                                                {assignment.project ? 'Habilitado' : 'Deshabilitado'}
                                            </span>
                                        </td>

                                        <td className="!text-center">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editAssignment(assignment)}>
                                                    Editar
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteAssignment(assignment.id)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentCareer;
