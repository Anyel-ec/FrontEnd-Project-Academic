import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconLinkedin from '../../components/Icon/IconLinkedin';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconX from '../../components/Icon/IconX';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import teacherService from '../../api/teacherService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

const Teachers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Docentes'));
    }, [dispatch]);

    const [addContactModal, setAddContactModal] = useState(false);
    const [value, setValue] = useState('list');
    const [search, setSearch] = useState('');
    const [contactList, setContactList] = useState([]);
    const [filteredItems, setFilteredItems] = useState(contactList);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [serverError, setServerError] = useState(null);


    const [newTeacher, setNewTeacher] = useState({
        dni: '',
        firstNames: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        institutionalEmail: '',
        phone: '',
        address: ''
    });

    const validationSchema = Yup.object().shape({
        dni: Yup.string().required('DNI es requerido').length(8, 'DNI debe tener 8 caracteres'),
        firstNames: Yup.string().required('Nombre es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Nombre solo puede contener letras y espacios').max(150, 'Nombre debe tener menos de 150 caracteres'),
        lastName: Yup.string().required('Apellido Paterno es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Apellido Paterno solo puede contener letras y espacios').max(50, 'Apellido Paterno debe tener menos de 50 caracteres'),
        middleName: Yup.string().required('Apellido Materno es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Apellido Materno solo puede contener letras y espacios').max(50, 'Apellido Materno debe tener menos de 50 caracteres'),
        birthDate: Yup.date().required('Fecha de Nacimiento es requerida'),
        institutionalEmail: Yup.string().required('Correo Institucional es requerido').email('Correo no es válido').max(100, 'Correo debe tener menos de 100 caracteres'),
        phone: Yup.string().required('Celular es requerido').length(9, 'Celular debe tener 9 dígitos').matches(/^[0-9]+$/, 'Celular solo puede contener números'),
        address: Yup.string().required('Dirección es requerida').max(255, 'Dirección debe tener menos de 255 caracteres'),
    });


    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await teacherService.getTeachers();
                setContactList(data);
                setFilteredItems(data);
            } catch (error) {
                showMessage('Error fetching teachers', 'error');
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item) => {
                return item.firstNames.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

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

    const saveTeacher = async (values, { setSubmitting }) => {
        setSubmitting(true);
        if (editingTeacher) {
            try {
                const updatedTeacher = await teacherService.editTeacher(editingTeacher.id, values);
                setContactList(contactList.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher));
                setFilteredItems(filteredItems.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher));
                showMessage('Teacher updated successfully.');
            } catch (error) {
                showMessage('Error updating teacher', 'error');
            }
        } else {
            try {
                const addedTeacher = await teacherService.addTeacher(values);
                setContactList([addedTeacher, ...contactList]);
                setFilteredItems([addedTeacher, ...filteredItems]);
                showMessage('Teacher added successfully.');
            } catch (error) {
                showMessage('Error adding teacher', 'error');
            }
        }

        setNewTeacher({
            dni: '',
            firstNames: '',
            lastName: '',
            middleName: '',
            birthDate: '',
            institutionalEmail: '',
            phone: '',
            address: ''
        });
        setEditingTeacher(null);
        setAddContactModal(false);
        setSubmitting(false);
    };

    const editUser = (user = null) => {
        if (user) {
            setEditingTeacher(user);
            setNewTeacher({
                dni: user.dni,
                firstNames: user.firstNames,
                lastName: user.lastName,
                middleName: user.middleName,
                birthDate: user.birthDate,
                institutionalEmail: user.institutionalEmail,
                phone: user.phone,
                address: user.address
            });
        } else {
            setEditingTeacher(null);
            setNewTeacher({
                dni: '',
                firstNames: '',
                lastName: '',
                middleName: '',
                birthDate: '',
                institutionalEmail: '',
                phone: '',
                address: ''
            });
        }
        setAddContactModal(true);
    };

    const deleteUser = async (user) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente quieres eliminar este docente?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, elimínalo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await teacherService.deleteTeacher(user.id);
                setContactList(contactList.filter((d) => d.id !== user.id));
                setFilteredItems(filteredItems.filter((d) => d.id !== user.id));
                showMessage('Docente eliminado exitosamente.');
            } catch (error) {
                showMessage('Error eliminando docente', 'error');
            }
        }
    };



    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Docentes</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Agregar Docente
                            </button>
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Buscar Docentes" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>DNI</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Correo Institucional</th>
                                    <th>Celular</th>
                                    <th>Dirección</th>
                                    <th className="!text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((teacher) => {
                                    return (
                                        <tr key={teacher.id}>
                                            <td>{teacher.dni}</td>
                                            <td>{teacher.firstNames}</td>
                                            <td>{teacher.lastName} {teacher.middleName} </td>
                                            <td>{teacher.birthDate}</td>
                                            <td>{teacher.institutionalEmail}</td>
                                            <td>{teacher.phone}</td>
                                            <td>{teacher.address}</td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(teacher)}>
                                                        Editar
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(teacher)}>
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
            )}

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
                                        {editingTeacher ? 'Editar Docente' : 'Agregar Docente'}
                                    </div>
                                    <div className="p-5">
                                        <Formik
                                            initialValues={newTeacher}
                                            validationSchema={validationSchema}
                                            onSubmit={saveTeacher}
                                        >
                                            {({ errors, submitCount, touched }) => (
                                                <Form className="space-y-5">
                                                    {serverError && <div className="text-danger">{serverError}</div>}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className={`mb-5 ${submitCount && errors.dni ? 'has-error' : ''}`}>
                                                            <label htmlFor="dni">DNI</label>
                                                            <Field name="dni" type="text" id="dni" placeholder="Ingrese el DNI" maxLength={8} className="form-input" />
                                                            <ErrorMessage name="dni" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 ${submitCount && errors.firstNames ? 'has-error' : ''}`}>
                                                            <label htmlFor="firstNames">Nombres</label>
                                                            <Field name="firstNames" type="text" id="firstNames" placeholder="Ingrese los nombres" maxLength={150} className="form-input" />
                                                            <ErrorMessage name="firstNames" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 ${submitCount && errors.lastName ? 'has-error' : ''}`}>
                                                            <label htmlFor="lastName">Apellido Paterno</label>
                                                            <Field name="lastName" type="text" id="lastName" placeholder="Ingrese el apellido paterno" maxLength={50} className="form-input" />
                                                            <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 ${submitCount && errors.middleName ? 'has-error' : ''}`}>
                                                            <label htmlFor="middleName">Apellido Materno</label>
                                                            <Field name="middleName" type="text" id="middleName" placeholder="Ingrese el apellido materno" maxLength={50} className="form-input" />
                                                            <ErrorMessage name="middleName" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 ${submitCount && errors.birthDate ? 'has-error' : ''}`}>
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
                                                        <div className={`mb-5 ${submitCount && errors.institutionalEmail ? 'has-error' : ''}`}>
                                                            <label htmlFor="institutionalEmail">Correo Institucional</label>
                                                            <Field name="institutionalEmail" type="email" id="institutionalEmail" placeholder="Ingrese el correo institucional" maxLength={100} className="form-input" />
                                                            <ErrorMessage name="institutionalEmail" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 ${submitCount && errors.phone ? 'has-error' : ''}`}>
                                                            <label htmlFor="phone">Celular</label>
                                                            <Field name="phone" type="text" id="phone" placeholder="Ingrese el número de celular" maxLength={9} className="form-input" />
                                                            <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={`mb-5 col-span-2 ${submitCount && errors.address ? 'has-error' : ''}`}>
                                                            <label htmlFor="address">Dirección</label>
                                                            <Field name="address" type="text" id="address" placeholder="Ingrese la dirección" maxLength={255} className="form-input" />
                                                            <ErrorMessage name="address" component="div" className="text-danger mt-1" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                            Cancelar
                                                        </button>
                                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {editingTeacher ? 'Actualizar' : 'Agregar'}
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

export default Teachers;
