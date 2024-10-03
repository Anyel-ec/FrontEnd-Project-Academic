import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../components/Icon/IconX';


const ReservationModal = ({ isOpen, onClose, onSave, student }) => {
    // Validación usando Yup
    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        studentTwoCode: Yup.string().max(6, 'Máximo 6 caracteres'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string(),
    });

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
                                Aceptar Reservación
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={{
                                        studentCode: student?.studentCode || '',
                                        studentTwoCode: student?.studentTwoCode || '',
                                        observation: student?.observation || '',
                                        meetRequirements: student ? String(student.meetRequirements) : '', // Convertir boolean a string
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={onSave}
                                >
                                    {({ errors, submitCount }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                <Field name="studentTwoCode" type="text" id="studentTwoCode" placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" />
                                                <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className={submitCount && errors.meetRequirements ? 'has-error' : ''}>
                                                <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                <div className="flex gap-4">
                                                    <label>
                                                        <Field type="radio" name="meetRequirements" value="yes" className="form-radio" />
                                                        Sí
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="meetRequirements" value="no" className="form-radio" />
                                                        No
                                                    </label>
                                                </div>
                                                <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="observation">Observaciones</label>
                                                <Field name="observation" as="textarea" id="observation" placeholder="Ingrese observaciones" className="form-input" />
                                                <ErrorMessage name="observation" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {student ? 'Actualizar' : 'Guardar'}
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

export default ReservationModal;
