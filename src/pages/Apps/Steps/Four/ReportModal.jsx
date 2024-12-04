import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import IconX from '../../../../components/Icon/IconX';

const ReportModal = ({ isOpen, onClose, onSave, report, adviserOptions }) => {

    const initialValues = React.useMemo(
        () => ({
            titleReservationStepOne: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.id || '',
            studentCode: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observation: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.observations || '',
            meetRequirements: report?.meetRequirements ? 'yes' : 'no',
        }),
        [report, adviserOptions]
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
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{report ? 'Editar Reporte' : 'Crear Reporte'}</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            meetRequirements: values.meetRequirements === 'yes', // Conversión a booleano
                                        };

                                        console.log('Llamando a onSave con:', transformedValues);
                                        onSave(transformedValues, report.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2" >
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode" > Primer Estudiante </label>
                                                < Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {
                                                report?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.studentTwo && (
                                                    <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                        <label htmlFor="studentTwoCode" > Segundo Estudiante </label>
                                                        < Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                        <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                    </div>
                                                )
                                            }

                                            <div>
                                                <label htmlFor="meetRequirements" > Cumple Requisitos </label>
                                                < div className="flex gap-4" >
                                                    <label>
                                                        <Field type="radio" name="meetRequirements" value="yes" className="form-radio" onChange={() => {
                                                            setFieldValue('meetRequirements', 'yes');
                                                            setFieldValue('observation', '');
                                                        }} />
                                                        Sí
                                                    </label>
                                                    < label >
                                                        <Field type="radio" name="meetRequirements" value="no" className="form-radio" onChange={() => {
                                                            setFieldValue('meetRequirements', 'no');
                                                        }} />
                                                        No
                                                    </label>
                                                </div>
                                                < ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                            </div>
                                            < div className="col-span-2" >
                                                <label htmlFor="observation" > Observaciones </label>
                                                < Field name="observation" as="textarea" id="observation" placeholder="Ingrese observaciones" className="form-input" disabled={values.meetRequirements === 'yes'}
                                                    style={{
                                                        cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                        opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                    }} />
                                                < ErrorMessage name="observation" component="div" className="text-danger mt-1" />
                                            </div>

                                            < div className="flex justify-end items-center mt-8 col-span-2" >
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose} >
                                                    Cancelar
                                                </button>
                                                < button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" >
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
