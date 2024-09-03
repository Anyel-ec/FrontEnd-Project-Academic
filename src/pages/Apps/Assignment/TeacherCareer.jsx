import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconSearch from '../../../components/Icon/IconSearch';
import Select from 'react-select';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import careerService from '../../../api/careerService';
import studentService from '../../../api/studentService';
import teacherCareerService from '../../../api/TeacherCareerService';
import teacherService from '../../../api/teacherService';
const TeacherCareer = () => {
    const dispatch = useDispatch();
    const [careerOptions, setCareerOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [search, setSearch] = useState('');

    const validationSchema = Yup.object().shape({
        career: Yup.object().nullable().required('Seleccione una carrera'),
        teacher: Yup.object().nullable().required('Seleccione un docente')
    });

    useEffect(() => {
        dispatch(setPageTitle('Asignación de docentes a carreras'));
        fetchAssignments();
        fetchCareers();
        fetchTeachers();
    }, [dispatch]);

    const fetchAssignments = async () => {
        try {
            const response = await teacherCareerService.getTeacherCareer();
            setAssignments(response);
            setFilteredItems(response);
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

    const fetchTeachers = async () => {
        try {
            const teachers = await teacherService.getTeachers();
            const options = teachers.map((teacher) => ({
                value: teacher.id,
                label: `${teacher.dni} - ${teacher.firstNames} ${teacher.lastName}`,
                data: teacher
            }));
            setTeacherOptions(options);
        } catch (error) {
            console.error("Error fetching teachers", error);
        }
    };

    useEffect(() => {
        setFilteredItems(() => {
            return assignments.filter((item) =>
                item.teacher && item.teacher.firstNames
                    ? item.teacher.firstNames.toLowerCase().includes(search.toLowerCase()) ||
                    item.teacher.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    item.teacher.dni.toLowerCase().includes(search.toLowerCase()) ||
                    item.career.name.toLowerCase().includes(search.toLowerCase())
                    : false
            );
        });
    }, [search, assignments]);

    const saveAssignment = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const teacherCareer = {
            teacher: { id: values.teacher.value },
            career: { id: values.career.value }
        };

        try {
            let response;
            if (editingAssignment) {
                response = await teacherCareerService.updateTeacherCareer(editingAssignment.id, teacherCareer);
                setAssignments((prev) =>
                    prev.map((assignment) =>
                        assignment.id === response.id ? response : assignment
                    )
                );
                fetchAssignments(); // Reload the datatable
            } else {
                response = await teacherCareerService.addTeacherCareer(teacherCareer);
                setAssignments((prev) => [response, ...prev]);
                fetchAssignments(); // Reload the datatable

            }

            setFilteredItems((prev) =>
                editingAssignment
                    ? prev.map((assignment) =>
                        assignment.id === response.id ? response : assignment
                    )
                    : [response, ...prev]
            );

            Swal.fire({
                icon: 'success',
                title: editingAssignment ? 'Asignación actualizada' : 'Asignación guardada',
                text: editingAssignment
                    ? 'La asignación ha sido actualizada exitosamente'
                    : 'El docente ha sido asignado a la carrera exitosamente',
            });

            setEditingAssignment(null);
            resetForm();
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
                await teacherCareerService.deleteTeacherCareer(assignmentId);
                setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
                setFilteredItems(filteredItems.filter((assignment) => assignment.id !== assignmentId));
                Swal.fire('¡Eliminada!', 'La asignación ha sido eliminada.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar la asignación', 'error');
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Asignación de docentes a carreras</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                        <IconSearch className="mx-auto" />
                    </button>
                </div>
            </div>

            <Formik
                initialValues={{
                    career: editingAssignment ? { value: editingAssignment.career.id, label: editingAssignment.career.name } : null,
                    teacher: editingAssignment ? { value: editingAssignment.teacher.id, label: `${editingAssignment.teacher.dni} - ${editingAssignment.teacher.firstNames} ${editingAssignment.teacher.lastName}` } : null,
                }}
                enableReinitialize
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

                            {/* Docente */}
                            <div className="w-1/3 px-2" id="tagging">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Docente</h5>
                                </div>
                                <div className="mb-5">
                                    <Select
                                        name="teacher"
                                        placeholder="Selecciona una opción"
                                        options={teacherOptions}
                                        onChange={(option) => setFieldValue('teacher', option)}
                                        value={values.teacher}
                                    />
                                    <ErrorMessage name="teacher" component="div" className="text-danger mt-1" />
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
                                <th>DNI</th>
                                <th>Nombre Completo</th>
                                <th>Carrera</th>
                                <th className="!text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((assignment) => {
                                const { teacher, career } = assignment;
                                const fullName = `${teacher.firstNames} ${teacher.lastName} ${teacher.middleName}`;
                                return (
                                    <tr key={assignment.id}>
                                        <td>{teacher.dni}</td>
                                        <td>{fullName}</td>
                                        <td>{career.name}</td>
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

export default TeacherCareer;
