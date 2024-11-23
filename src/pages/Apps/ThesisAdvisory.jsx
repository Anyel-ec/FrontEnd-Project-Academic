import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconSearch from '../../components/Icon/IconSearch';
import IconX from '../../components/Icon/IconX';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ThesisAdvisoryService from '../../api/ThesisAdvisoryService';
import studentService from '../../api/studentService';
import teacherService from '../../api/teacherService';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import IconPlus from '../../components/Icon/IconPlus';
import IconMinus from '../../components/Icon/IconMinus';
import Select from 'react-select';

const ThesisAdvisory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Thesis Advisories'));
    }, [dispatch]);

    const [addContactModal, setAddContactModal] = useState(false);
    const [value, setValue] = useState('list');
    const [search, setSearch] = useState('');
    const [contactList, setContactList] = useState([]);
    const [filteredItems, setFilteredItems] = useState(contactList);
    const [editingAdvisory, setEditingAdvisory] = useState(null);
    const [serverError, setServerError] = useState('');
    const [expandedRows, setExpandedRows] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [submitCount, setSubmitCount] = useState(0);

    const validationSchema = Yup.object().shape({
        coAdviser: Yup.string().max(200, 'Debe tener máximo 200 caracteres').required('Campo requerido'),
        thesisTitle: Yup.string().max(250, 'Debe tener máximo 250 caracteres').required('Campo requerido'),
        startDate: Yup.date().required('Campo requerido'),
        extensionDate: Yup.date().nullable(),
        endDate: Yup.date().required('Campo requerido'),
        studentCareer: Yup.object().required('Campo requerido'),
        teacherCareer: Yup.object().required('Campo requerido')
    });

    useEffect(() => {
        const fetchThesisAdvisories = async () => {
            try {
                const data = await ThesisAdvisoryService.getAllAdvisories();
                setContactList(data);
                setFilteredItems(data);
            } catch (error) {
                showMessage('Error al buscar asesorías de tesis', 'error');
            }
        };

        const fetchStudents = async () => {
            try {
                const students = await studentService.getStudents();
                const options = students.map((student) => ({
                    value: student.id,
                    label: `${student.firstNames} ${student.lastName} - ${student.studentCode}`
                }));
                setStudentOptions(options);
            } catch (error) {
                showMessage('Error al obtener estudiantes', 'error');
            }
        };

        const fetchTeachers = async () => {
            try {
                const teachers = await teacherService.getTeachers();
                const options = teachers.map((teacher) => ({
                    value: teacher.id,
                    label: `${teacher.firstNames} ${teacher.lastName}`
                }));
                setTeacherOptions(options);
            } catch (error) {
                showMessage('Error al obtener docentes', 'error');
            }
        };

        fetchThesisAdvisories();
        fetchStudents();
        fetchTeachers();
    }, []);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item) => {
                return item.thesisTitle.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

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

    const saveAdvisory = async (values, { resetForm }) => {
        setServerError(null);
        try {
            const formattedValues = {
                ...values,
                studentCareer: values.studentCareer.value,
                teacherCareer: values.teacherCareer.value
            };

            if (editingAdvisory) {
                const updatedAdvisory = await ThesisAdvisoryService.editAdvisory(editingAdvisory.id, formattedValues);
                setContactList(contactList.map(advisory => advisory.id === updatedAdvisory.id ? updatedAdvisory : advisory));
                setFilteredItems(filteredItems.map(advisory => advisory.id === updatedAdvisory.id ? updatedAdvisory : advisory));
                showMessage('Asesoría de tesis actualizada exitosamente.');
            } else {
                const addedAdvisory = await ThesisAdvisoryService.addAdvisory(formattedValues);
                setContactList([addedAdvisory, ...contactList]);
                setFilteredItems([addedAdvisory, ...filteredItems]);
                showMessage('Asesoría de tesis agregada exitosamente.');
            }
            setEditingAdvisory(null);
            setAddContactModal(false);
            resetForm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error guardando la asesoría de tesis. Por favor, inténtalo de nuevo más tarde.',
            });
        }
    };

    const editAdvisory = (advisory = null) => {
        setServerError(null);
        if (advisory) {
            setEditingAdvisory(advisory);
        } else {
            setEditingAdvisory(null);
        }
        setAddContactModal(true);
    };

    const deleteAdvisory = async (advisory) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente quieres eliminar esta asesoría de tesis?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínalo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await ThesisAdvisoryService.deleteAdvisory(advisory.id);
                setContactList(contactList.filter((d) => d.id !== advisory.id));
                setFilteredItems(filteredItems.filter((d) => d.id !== advisory.id));
                showMessage('La asesoría de tesis ha sido eliminada exitosamente.');
            } catch (error) {
                showMessage('Error al eliminar la asesoría de tesis', 'error');
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold mb-5">Asesorías de Tesis</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editAdvisory()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Agregar Asesoría
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Buscar" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th></th>
                                    <th>Codigo de estudiante</th>
                                    <th>Estudiante</th>
                                    <th>Título de Tesis</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha de Ampliación</th>
                                    <th>Fecha de Fin</th>
                                    <th>Docente</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((advisory) => {
                                    const isExpanded = expandedRows.includes(advisory.id);
                                    return (
                                        <Fragment key={advisory.id}>
                                            <tr>
                                                <td>
                                                    <button onClick={() => toggleRow(advisory.id)}>
                                                        {isExpanded ? <IconMinus /> : <IconPlus />}
                                                    </button>
                                                </td>
                                                <td>{advisory.student.studentCode}</td>
                                                <td>{`${advisory.student.firstNames} ${advisory.student.lastName}`}</td>
                                                <td>{advisory.thesisTitle}</td>
                                                <td>{advisory.startDate.toISOString().split('T')[0]}</td>
                                                <td>{advisory.extensionDate ? advisory.extensionDate.toISOString().split('T')[0] : 'N/A'}</td>
                                                <td>{advisory.endDate.toISOString().split('T')[0]}</td>
                                                <td>{`${advisory.teacher.firstNames} ${advisory.teacher.lastName}`}</td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editAdvisory(advisory)}>
                                                            Editar
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteAdvisory(advisory)}>
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan="9">
                                                        <div className="p-4 bg-gray-100">
                                                            <div><strong>Detalle de la Asesoría:</strong></div>
                                                            <div>Reserva del Título: {advisory.reservationTitle}</div>
                                                            <div>Constancia de Filtro: {advisory.filterCertificate}</div>
                                                            <div>Aprobación de Tesis: {advisory.thesisApproval}</div>
                                                            <div>Designación de Jurados: {advisory.juryDesignation}</div>
                                                            <div>Recomposición de Jurados: {advisory.juryRecomposition}</div>
                                                            <div>Primera Revisión: {advisory.firstReview}</div>
                                                            <div>Última Revisión: {advisory.lastReview}</div>
                                                            <div>Ampliación de Plazo: {advisory.extensionPeriod}</div>
                                                            <div>Certificado de Presentación: {advisory.presentationCertificate}</div>
                                                            <div>Fecha de Presentación: {advisory.presentationDate}</div>
                                                            <div>Notificación a Jurados: {advisory.juryNotification}</div>
                                                            <div>Aprobación de Presentación: {advisory.presentationApproval}</div>
                                                            <div>Entrega de Empastados: {advisory.bindingDeliveryCertificate}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
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
                                        {editingAdvisory ? 'Editar Asesoría de Tesis' : 'Agregar Asesoría de Tesis'}
                                    </div>
                                    <div className="p-5">
                                        <Formik
                                            initialValues={{
                                                coAdviser: editingAdvisory ? editingAdvisory.coAdviser : '',
                                                thesisTitle: editingAdvisory ? editingAdvisory.thesisTitle : '',
                                                startDate: editingAdvisory ? editingAdvisory.startDate : '',
                                                extensionDate: editingAdvisory ? editingAdvisory.extensionDate : '',
                                                endDate: editingAdvisory ? editingAdvisory.endDate : '',
                                                studentCareer: editingAdvisory ? { value: editingAdvisory.studentCareer, label: editingAdvisory.studentCareer } : null,
                                                teacherCareer: editingAdvisory ? { value: editingAdvisory.teacherCareer, label: editingAdvisory.teacherCareer } : null
                                            }}
                                            enableReinitialize={true}
                                            validationSchema={validationSchema}
                                            onSubmit={saveAdvisory}
                                        >
                                            {({ setFieldValue, isSubmitting, values }) => (
                                                <Form className="space-y-5">
                                                    {serverError && <div className="text-danger">{serverError}</div>}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className={submitCount && errors.coAdviser ? 'has-error' : ''}>
                                                            <label htmlFor="coAdviser">Coasesor</label>
                                                            <Field name="coAdviser" type="text" id="coAdviser" placeholder="Ingrese el nombre del coasesor" maxLength={200} className="form-input" />
                                                            <ErrorMessage name="coAdviser" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.thesisTitle ? 'has-error' : ''}>
                                                            <label htmlFor="thesisTitle">Título de Tesis</label>
                                                            <Field name="thesisTitle" type="text" id="thesisTitle" placeholder="Ingrese el título de la tesis" maxLength={250} className="form-input" />
                                                            <ErrorMessage name="thesisTitle" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.startDate ? 'has-error' : ''}>
                                                            <label htmlFor="startDate">Fecha de Inicio</label>
                                                            <Field name="startDate">
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
                                                            <ErrorMessage name="startDate" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.extensionDate ? 'has-error' : ''}>
                                                            <label htmlFor="extensionDate">Fecha de Ampliación</label>
                                                            <Field name="extensionDate">
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
                                                            <ErrorMessage name="extensionDate" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.endDate ? 'has-error' : ''}>
                                                            <label htmlFor="endDate">Fecha de Fin</label>
                                                            <Field name="endDate">
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
                                                            <ErrorMessage name="endDate" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.studentCareer ? 'has-error' : ''}>
                                                            <label htmlFor="studentCareer">Estudiante</label>
                                                            <Select
                                                                name="studentCareer"
                                                                placeholder="Selecciona un estudiante"
                                                                options={studentOptions}
                                                                onChange={(option) => setFieldValue('studentCareer', option)}
                                                                value={values.studentCareer}
                                                            />
                                                            <ErrorMessage name="studentCareer" component="div" className="text-danger mt-1" />
                                                        </div>
                                                        <div className={submitCount && errors.teacherCareer ? 'has-error' : ''}>
                                                            <label htmlFor="teacherCareer">Docente</label>
                                                            <Select
                                                                name="teacherCareer"
                                                                placeholder="Selecciona un docente"
                                                                options={teacherOptions}
                                                                onChange={(option) => setFieldValue('teacherCareer', option)}
                                                                value={values.teacherCareer}
                                                            />
                                                            <ErrorMessage name="teacherCareer" component="div" className="text-danger mt-1" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                            Cancelar
                                                        </button>
                                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {editingAdvisory ? 'Actualizar' : 'Agregar'}
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

export default ThesisAdvisory;
