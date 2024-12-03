import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Select from 'react-select';
import IconX from '../../../components/Icon/IconX';
import { HandleMode } from '../styles/selectStyles';
import { useSelector } from 'react-redux'; // O useContext si usas contexto
import { useNumericKeyDown } from '../Steps/utils/useNumericKeyDown ';
import { useNonNumericKeyDown } from '../Steps/utils/useNonNumericKeyDown';

const validationSchema = Yup.object().shape({
    studentCode: Yup.string().length(6, 'Debe tener exactamente 6 números').required('Campo requerido').matches(/^\d{6}$/, 'Código debe tener exactamente 6 números'),
    dni: Yup.string()
        .required('DNI es requerido')
        .matches(/^\d{8}$/, 'DNI debe tener exactamente 8 números') // Solo acepta 8 dígitos
        .length(8, 'DNI debe tener 8 caracteres'),
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
    email: Yup.string().email('Correo electrónico no válido').max(100, 'Debe tener máximo 100 caracteres').required('Campo requerido'),
    phone: Yup.string().matches(/\d+/, 'Solo números').length(9, 'Debe tener exactamente 9 caracteres').required('Campo requerido'),
    address: Yup.string().max(255, 'Debe tener máximo 255 caracteres').required('Campo requerido'),
    gender: Yup.string().required('Campo requerido'),
    career: Yup.object().required('Campo requerido').nullable(false),
});
const today = new Date();
const maxDateAllowed = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const validateDate = (date) => {
    const selectedDate = new Date(date[0]);
    const today = new Date();

    if (selectedDate > today) {
        setBirthDateError('La fecha de nacimiento no puede ser una fecha futura');
        return false;
    }

    const age = today.getFullYear() - selectedDate.getFullYear();
    const isBirthdayPassed = today.getMonth() > selectedDate.getMonth() || (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
        setBirthDateError('Debe tener al menos 18 años');
        return false;
    }

    setBirthDateError('');
    return true;
};

const StudentModal = ({ isOpen, onClose, onSave, student, careerOptions }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark'); // Obtener el tema desde Redux
    const styles = HandleMode(isDarkMode); // Aplicar los estilos según el modo
    const handleKeyDown = useNumericKeyDown();
    const handleNonKeyDown = useNonNumericKeyDown();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {student ? 'Editar Estudiante' : 'Agregar Estudiante'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={{
                                        studentCode: student?.studentCode || '',
                                        dni: student?.dni || '',
                                        firstNames: student?.firstNames || '',
                                        lastName: student?.lastName || '',
                                        middleName: student?.middleName || '',
                                        birthDate: student?.birthDate || '',
                                        email: student?.email || '',
                                        phone: student?.phone || '',
                                        address: student?.address || '',
                                        gender: student ? String(student.gender) : '', // Convertir boolean a string
                                        career: careerOptions.find((option) => option.value === student?.career?.id) || null,
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    onSubmit={onSave}
                                >
                                    {({ errors, submitCount, values, setFieldValue }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {errors.serverError && <div className="text-danger">{errors.serverError}</div>}
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Código</label>
                                                <Field name="studentCode" type="text" id="studentCode" placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" onKeyDown={handleKeyDown}
                                                />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.dni ? 'has-error' : ''}>
                                                <label htmlFor="dni">DNI</label>
                                                <Field
                                                    name="dni"
                                                    type="text"
                                                    id="dni"
                                                    placeholder="Ingrese el DNI"
                                                    maxLength={8}
                                                    className="form-input"
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <ErrorMessage name="dni" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.firstNames ? 'has-error' : ''}>
                                                <label htmlFor="firstNames">Nombre</label>
                                                <Field name="firstNames" type="text" id="firstNames" placeholder="Ingrese el nombre" maxLength={150} className="form-input" onKeyDown={handleNonKeyDown}/>
                                                <ErrorMessage name="firstNames" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.lastName ? 'has-error' : ''}>
                                                <label htmlFor="lastName">Apellido Paterno</label>
                                                <Field name="lastName" type="text" id="lastName" placeholder="Ingrese el apellido paterno" maxLength={50} className="form-input" onKeyDown={handleNonKeyDown}/>
                                                <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.middleName ? 'has-error' : ''}>
                                                <label htmlFor="middleName">Apellido Materno</label>
                                                <Field name="middleName" type="text" id="middleName" placeholder="Ingrese el apellido materno" maxLength={50} className="form-input" onKeyDown={handleNonKeyDown}/>
                                                <ErrorMessage name="middleName" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.career ? 'has-error' : ''}>
                                                <label htmlFor="career">Carrera</label>
                                                <Select
                                                    name="career"
                                                    styles={styles}
                                                    placeholder="Selecciona una carrera"
                                                    options={careerOptions}
                                                    onChange={(option) => setFieldValue('career', option)}
                                                    value={values.career}
                                                />
                                                <ErrorMessage name="career" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.birthDate ? 'has-error' : 'col-span-1'}>
                                                <label htmlFor="birthDate">Fecha de Nacimiento</label>
                                                <Field name="birthDate">
                                                    {({ field }) => (
                                                        <Flatpickr
                                                            {...field}
                                                            placeholder="Ingrese la fecha"
                                                            value={field.value || ''}
                                                            options={{
                                                                dateFormat: 'Y-m-d',
                                                                position: 'auto left',
                                                                locale: Spanish,
                                                                maxDate: maxDateAllowed.toISOString().split('T')[0], // Fecha mínima permitida
                                                            }}
                                                            className="form-input"
                                                            onChange={(date) => {
                                                                setFieldValue('birthDate', date[0].toISOString().split('T')[0]);
                                                                validateDate(date);
                                                            }}
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
                                                <Field
                                                    name="phone"
                                                    type="text"
                                                    id="phone"
                                                    placeholder="Ingrese el número de celular"
                                                    maxLength={9}
                                                    className="form-input"
                                                    onKeyDown={
                                                        handleKeyDown
                                                    }
                                                />
                                                <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.gender ? 'has-error' : ''}>
                                                <label htmlFor="gender">Sexo</label>
                                                <Field as="select" name="gender" id="gender" className="form-select">
                                                    <option value="" disabled>
                                                        Selecciona una opción
                                                    </option>
                                                    <option value="true">Masculino</option>
                                                    <option value="false">Femenino</option>
                                                </Field>
                                                <ErrorMessage name="gender" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.address ? 'has-error' : 'col-span-2'}>
                                                <label htmlFor="address">Dirección</label>
                                                <Field name="address" type="text" id="address" placeholder="Ingrese la dirección" maxLength={255} className="form-input" />
                                                <ErrorMessage name="address" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {student ? 'Actualizar' : 'Agregar'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default StudentModal;
