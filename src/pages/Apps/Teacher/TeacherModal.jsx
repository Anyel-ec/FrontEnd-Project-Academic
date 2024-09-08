import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Select from 'react-select';
import IconX from '../../../components/Icon/IconX';
import { HandleMode } from '../styles/selectStyles';


const isDarkMode = false; // O la lógica para determinar el modo (puede ser gestionada por estado o contexto)

const styles = HandleMode(isDarkMode); // Llamamos a la función con el valor de isDarkMode


const validationSchema = Yup.object().shape({
    dni: Yup.string().required('DNI es requerido').length(8, 'DNI debe tener 8 caracteres'),
    firstNames: Yup.string()
        .required('Nombre es requerido')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Nombre solo puede contener letras y espacios')
        .max(150, 'Nombre debe tener menos de 150 caracteres'),
    lastName: Yup.string()
        .required('Apellido Paterno es requerido')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Apellido Paterno solo puede contener letras y espacios')
        .max(50, 'Apellido Paterno debe tener menos de 50 caracteres'),
    middleName: Yup.string()
        .required('Apellido Materno es requerido')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Apellido Materno solo puede contener letras y espacios')
        .max(50, 'Apellido Materno debe tener menos de 50 caracteres'),
    birthDate: Yup.date().required('Fecha de Nacimiento es requerida'),
    institutionalEmail: Yup.string().required('Correo Institucional es requerido').email('Correo no es válido').max(100, 'Correo debe tener menos de 100 caracteres'),
    phone: Yup.string()
        .required('Celular es requerido')
        .length(9, 'Celular debe tener 9 dígitos')
        .matches(/^[0-9]+$/, 'Celular solo puede contener números'),
    address: Yup.string().required('Dirección es requerida').max(255, 'Dirección debe tener menos de 255 caracteres'),
});

const TeacherModal = ({ isOpen, onClose, onSave, teacher, careerOptions }) => {
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
                                {teacher ? 'Editar Docente' : 'Agregar Docente'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={{
                                        dni: teacher?.dni || '',
                                        firstNames: teacher?.firstNames || '',
                                        lastName: teacher?.lastName || '',
                                        middleName: teacher?.middleName || '',
                                        birthDate: teacher?.birthDate || '',
                                        institutionalEmail: teacher?.institutionalEmail || '',
                                        phone: teacher?.phone || '',
                                        address: teacher?.address || '',
                                        career: careerOptions.find((option) => option.value === teacher?.career?.id) || null,

                                    }}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    onSubmit={onSave}
                                >
                                    {({ errors, submitCount, values, setFieldValue }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                            <div className={submitCount && errors.institutionalEmail ? 'has-error' : ''}>
                                                <label htmlFor="institutionalEmail">Correo</label>
                                                <Field
                                                    name="institutionalEmail"
                                                    type="email"
                                                    id="institutionalEmail"
                                                    placeholder="Ingrese el correo electrónico"
                                                    maxLength={100}
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="institutionalEmail" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={submitCount && errors.phone ? 'has-error' : ''}>
                                                <label htmlFor="phone">Celular</label>
                                                <Field name="phone" type="text" id="phone" placeholder="Ingrese el número de celular" maxLength={9} className="form-input" />
                                                <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
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
                                                    {teacher ? 'Actualizar' : 'Agregar'}
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

export default TeacherModal;