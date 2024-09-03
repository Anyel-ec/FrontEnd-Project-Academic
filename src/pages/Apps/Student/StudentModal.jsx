import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Select from 'react-select';
import IconX from '../../../components/Icon/IconX';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#121E32',
        color: '#798099',
        borderColor: '#17263C',
        padding: '0rem 0.5rem', // Reducir el padding para hacer el control más pequeño

        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.475rem', // Reducir el tamaño de la fuente (equivalente a text-sm en Tailwind)
        '&:hover': {
        },
        '&:focus-within': {
            outline: 'none',
            borderColor: '#243778',
            boxShadow: '0 0 0 2px rgba(18, 30, 50, 0.5)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#1967D2' : '#121E32',
        color: state.isSelected ? '#fff' : '#888E8D',
        padding: '0 0.5em 0 0.5rem', // Reducir el padding de las opciones
        fontSize: '0.875rem', // Reducir el tamaño de la fuente
        '&:hover': {
            backgroundColor: '#1967D2',
            color: '#fff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#888E8D',
        fontSize: '0.875rem', // Reducir el tamaño de la fuente del valor seleccionado
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#121E32',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#fff',
        padding: '0',
        marginTop: '1px', // Asegura que no haya margen superior
        marginBottom: '0', // Asegura que no haya margen inferior
        overflow: 'hidden', // Evita que los elementos sobresalgan del menú
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#646B7A',
        
        fontSize: '0.875rem', // Reducir el tamaño de la fuente del placeholder
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        
        color: '#5F6675',
    }),
    indicatorSeparator: () => ({
        display: 'none', // Ocultar el separador de los indicadores
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0', // Elimina el padding del contenedor de las opciones
    }),
};

const validationSchema = Yup.object().shape({
    studentCode: Yup.string().length(6, 'Debe tener exactamente 6 caracteres').required('Campo requerido'),
    dni: Yup.string().length(8, 'Debe tener exactamente 8 caracteres').required('Campo requerido'),
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
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Solo números')
        .length(9, 'Debe tener exactamente 9 caracteres')
        .required('Campo requerido'),
    address: Yup.string().max(255, 'Debe tener máximo 255 caracteres').required('Campo requerido'),
    gender: Yup.string().required('Campo requerido'),
    career: Yup.object().required('Campo requerido').nullable(),
});

const StudentModal = ({ isOpen, onClose, onSave, student, careerOptions }) => {
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
                                            <div className={submitCount && errors.career ? 'has-error' : ''}>
                                                <label htmlFor="career">Carrera</label>
                                                <Select
                                                    name="career"
                                                    styles={customStyles}
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
                                                            placeholder='Ingrese la fecha'
                                                            value={field.value || ''}   
                                                            options={{
                                                                dateFormat: 'Y-m-d',
                                                                position: 'auto left',
                                                                locale: Spanish,
                                                            }}
                                                            className="form-input"
                                                            onChange={(date) =>
                                                                field.onChange({
                                                                    target: {
                                                                        name: field.name,
                                                                        value: date[0].toISOString().split('T')[0],
                                                                    },
                                                                })
                                                            }
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
