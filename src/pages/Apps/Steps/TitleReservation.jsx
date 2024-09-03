import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../../components/Icon/IconLayoutGrid';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUser from '../../../components/Icon/IconUser';
import IconFacebook from '../../../components/Icon/IconFacebook';
import IconInstagram from '../../../components/Icon/IconInstagram';
import IconLinkedin from '../../../components/Icon/IconLinkedin';
import IconTwitter from '../../../components/Icon/IconTwitter';
import IconX from '../../../components/Icon/IconX';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconCode from '../../../components/Icon/IconCode';
import Select from 'react-select';
import IconMail from '../../../components/Icon/IconMail';
import IconBolt from '../../../components/Icon/IconBolt';
import careerService from '../../../api/careerService';
import studentCareerService from '../../../api/studentCareerService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spanish from 'flatpickr/dist/l10n/es.js';


const TitleReservation = () => {
    const dispatch = useDispatch();
    const [careers, setCareers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [addContactModal, setAddContactModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [serverError, setServerError] = useState(null);

    const validationSchema = Yup.object().shape({
        studentCode: Yup.string()
            .length(6, 'Debe tener exactamente 6 caracteres')
            .required('Campo requerido'),
        dni: Yup.string()
            .length(8, 'Debe tener exactamente 8 caracteres')
            .required('Campo requerido'),
        firstNames: Yup.string()
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras latinoamericanas y espacios')
            .max(150, 'Debe tener máximo 150 caracteres')
            .required('Campo requerido'),
        lastName: Yup.string()
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras latinoamericanas y espacios')
            .max(50, 'Debe tener máximo 50 caracteres')
            .required('Campo requerido'),
        middleName: Yup.string()
            .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras latinoamericanas y espacios')
            .max(50, 'Debe tener máximo 50 caracteres')
            .required('Campo requerido'),
        birthDate: Yup.string().required('Campo requerido'),
        email: Yup.string()
            .email('Correo electrónico no válido')
            .max(100, 'Debe tener máximo 100 caracteres')
            .required('Campo requerido'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Solo números')
            .length(9, 'Debe tener exactamente 9 caracteres')
            .required('Campo requerido'),
        address: Yup.string().max(255, 'Debe tener máximo 255 caracteres').required('Campo requerido'),
        gender: Yup.boolean().required('Campo requerido').oneOf([true, false], 'Seleccione una opción válida'),
        meetsRequirements: Yup.boolean().required('Campo requerido').oneOf([true, false], 'Seleccione una opción válida'),
        observations: Yup.string().max(500, 'Debe tener máximo 500 caracteres')
    });

    useEffect(() => {
        dispatch(setPageTitle('Estudiantes'));

        const fetchCareers = async () => {
            try {
                const data = await careerService.getCareers();
                setCareers(data.map(career => ({ value: career.id, label: career.name })));
            } catch (error) {
                console.error("Error fetching careers", error);
            }
        };

        fetchCareers();
    }, [dispatch]);

    const handleCareerChange = async (selectedOption) => {
        setSelectedCareer(selectedOption);
        setSelectedStudent(null); // Reset the student selection when the career changes
        if (selectedOption) {
            try {
                const data = await studentCareerService.getStudentCareersByCareer(selectedOption.value);
                const studentsData = data.map(studentCareer => ({
                    value: studentCareer.student.id,
                    label: `${studentCareer.student.firstNames} ${studentCareer.student.lastName} ${studentCareer.student.middleName}`,
                    studentCode: studentCareer.student.studentCode,
                    project: studentCareer.project
                }));
                setStudents(studentsData);
                setFilteredItems(data);
            } catch (error) {
                console.error("Error fetching students by career", error);
            }
        } else {
            setStudents([]);
            setFilteredItems([]);
        }
    };

    const handleStudentChange = (selectedOption) => {
        setSelectedStudent(selectedOption);
    };

    useEffect(() => {
        setFilteredItems(() => {
            return students.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
        });
    }, [search, students]);

    const showMessage = (msg = '', type = 'success') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const saveStudent = async (student, { setSubmitting }) => {
        try {
            if (editingStudent) {
                await studentCareerService.updateStudentCareer(editingStudent.id, { ...student, careerId: selectedCareer.value });
                showMessage('Estudiante actualizado correctamente');
            } else {
                await studentCareerService.addStudentCareer({ ...student, careerId: selectedCareer.value });
                showMessage('Estudiante agregado correctamente');
            }
            setAddContactModal(false);
            setEditingStudent(null);
            setServerError(null);
            setSubmitting(false);
            handleCareerChange(selectedCareer);
        } catch (error) {
            setServerError(error.response?.data.message || 'Error al guardar el estudiante');
            setSubmitting(false);
        }
    };

    const editUser = (user = null) => {
        setServerError(null);
        if (user) {
            setEditingStudent(user);
        } else {
            setEditingStudent(null);
        }
        setAddContactModal(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Reserva de Títulos para Trabajo</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()} disabled={!selectedStudent}>
                                Registrar estudiante
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-5">
                <div className="w-1/2 px-2">
                    <div className="mb-5">
                        <Select
                            placeholder="Selecciona una carrera"
                            options={careers}
                            onChange={handleCareerChange}
                        />
                    </div>
                </div>

                <div className="w-1/2 px-2">
                    <div className="mb-5">
                        <Select
                            placeholder="Selecciona un estudiante"
                            options={students}
                            onChange={handleStudentChange}
                            isDisabled={!selectedCareer || students.length === 0}
                            value={selectedStudent}
                            noOptionsMessage={() => "No hay estudiantes disponibles"}
                        />
                    </div>
                </div>
            </div>

            {/* {selectedCareer && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Estudiante</th>
                                    <th>Código Estudiante</th>
                                    <th>Proyecto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((studentCareer) => (
                                    <tr key={studentCareer.value}>
                                        <td>{studentCareer.label}</td>
                                        <td>{studentCareer.studentCode}</td>
                                        <td>{studentCareer.project ? 'Sí' : 'No'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )} */}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {editingStudent ? 'Editar Estudiante' : 'Agregar Estudiante'}
                                    </div>
                                    <div className="p-5">
                                        <Formik
                                            initialValues={editingStudent || {
                                                studentCode: '',
                                                dni: '',
                                                firstNames: '',
                                                lastName: '',
                                                middleName: '',
                                                birthDate: '',
                                                email: '',
                                                phone: '',
                                                address: '',
                                                gender: '',
                                                meetsRequirements: false,
                                                observations: ''
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={saveStudent}
                                        >
                                            {({ errors, submitCount, touched }) => (
                                                <Form className="space-y-5">
                                                    {serverError && <div className="text-danger">{serverError}</div>}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                            <label htmlFor="studentCode">Código</label>
                                                            <Field name="studentCode" type="text" id="studentCode" placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" />
                                                            <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.dni ? 'has-error' : ''}>
                                                            <label htmlFor="dni">DNI</label>
                                                            <Field name="dni" type="text" id="dni" placeholder="Ingrese el DNI" maxLength={8} className="form-input" />
                                                            <ErrorMessage name="dni" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.firstNames ? 'has-error' : ''}>
                                                            <label htmlFor="firstNames">Nombre</label>
                                                            <Field name="firstNames" type="text" id="firstNames" placeholder="Ingrese el nombre" maxLength={150} className="form-input" />
                                                            <ErrorMessage name="firstNames" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.lastName ? 'has-error' : ''}>
                                                            <label htmlFor="lastName">Apellido Paterno</label>
                                                            <Field name="lastName" type="text" id="lastName" placeholder="Ingrese el apellido paterno" maxLength={50} className="form-input" />
                                                            <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.middleName ? 'has-error' : ''}>
                                                            <label htmlFor="middleName">Apellido Materno</label>
                                                            <Field name="middleName" type="text" id="middleName" placeholder="Ingrese el apellido materno" maxLength={50} className="form-input" />
                                                            <ErrorMessage name="middleName" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.birthDate ? 'has-error' : ''}>
                                                            <label htmlFor="birthDate">Fecha de Nacimiento</label>
                                                            <Field name="birthDate">
                                                                {({ field }) => (
                                                                    <Flatpickr
                                                                        {...field}
                                                                        value={field.value || ''}
                                                                        options={{ dateFormat: 'Y-m-d', position: 'auto left', locale: Spanish }}
                                                                        className="form-input"
                                                                        onChange={(date) => field.onChange({ target: { name: field.name, value: date[0].toISOString().split('T')[0] } })}
                                                                    />
                                                                )}
                                                            </Field>
                                                            <ErrorMessage name="birthDate" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.email ? 'has-error' : ''}>
                                                            <label htmlFor="email">Correo</label>
                                                            <Field name="email" type="email" id="email" placeholder="Ingrese el correo electrónico" maxLength={100} className="form-input" />
                                                            <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.phone ? 'has-error' : ''}>
                                                            <label htmlFor="phone">Celular</label>
                                                            <Field name="phone" type="text" id="phone" placeholder="Ingrese el número de celular" maxLength={9} className="form-input" />
                                                            <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.address ? 'has-error' : ''} >
                                                            <label htmlFor="address">Dirección</label>
                                                            <Field name="address" type="text" id="address" placeholder="Ingrese la dirección" maxLength={255} className="form-input" />
                                                            <ErrorMessage name="address" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.gender ? 'has-error' : ''}>
                                                            <label htmlFor="gender">Sexo</label>
                                                            <Field as="select" name="gender" id="gender" className="form-select">
                                                                <option value="" disabled>Selecciona una opción</option>
                                                                <option value="true">Masculino</option>
                                                                <option value="false">Femenino</option>
                                                            </Field>
                                                            <ErrorMessage name="gender" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.meetsRequirements ? 'has-error' : ''}>
                                                            <label htmlFor="meetsRequirements">Cumple Requerimientos</label>
                                                            <Field as="select" name="meetsRequirements" id="meetsRequirements" className="form-select">
                                                                <option value="" disabled>Selecciona una opción</option>
                                                                <option value="true">Sí</option>
                                                                <option value="false">No</option>
                                                            </Field>
                                                            <ErrorMessage name="meetsRequirements" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.observations ? 'has-error' : ''}>
                                                            <label htmlFor="observations">Observaciones</label>
                                                            <Field name="observations" as="textarea" id="observations" placeholder="Ingrese observaciones" maxLength={500} className="form-input" />
                                                            <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                            Cancelar
                                                        </button>
                                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {editingStudent ? 'Actualizar' : 'Agregar'}
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default TitleReservation;
