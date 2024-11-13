import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import IconX from '../../../../components/Icon/IconX';

const ReportModal = ({ isOpen, onClose, onSave, project, adviserOptions }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    const initialValues = React.useMemo(
        () => ({
            titleReservationStepOne: project?.titleReservationStepOne?.id || '',
            studentCode: project?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: project?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: project?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: project?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observation: project?.titleReservationStepOne?.observations || '',
            adviser: project?.adviser ? { value: project.adviser.id, label: `${project.adviser.firstNames} ${project.adviser.lastName}` } : null,
            coadviser: project?.coadviser ? { value: project.coadviser.id, label: `${project.coadviser.firstNames} ${project.coadviser.lastName}` } : null,
            meetRequirements: project?.meetRequirements ? 'yes' : 'no',
        }),
        [project, adviserOptions]
    );
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
                                {project ? 'Editar Reporte' : 'Crear Reporte'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            titleReservationStepOne: {
                                                id: values.titleReservationStepOne,
                                            },
                                            adviser: {
                                                id: values.adviser ? values.adviser.value : null,
                                            },
                                            coadviser: values.coadviser ? { id: values.coadviser.value } : null,
                                            observations: values.observation || '',
                                            meetRequirements: values.meetRequirements === 'yes', // Conversión a booleano
                                        };

                                        console.log('Llamando a onSave con:', transformedValues);
                                        onSave(transformedValues, project.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ errors, submitCount, setFieldValue, values, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {project?.titleReservationStepOne?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}

                                            
                                            <div>
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
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isSubmitting}>
                                                    Guardar
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

export default ReportModal;
