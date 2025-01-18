import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import IconX from '../../../../components/Icon/IconX';
import Swal from 'sweetalert2';

const RecompositionModal = ({ isOpen, onClose, onSave, recomposition }) => {
    const initialValues = useMemo(
        () => ({
            meetRequirements: recomposition?.meetRequirements ? 'yes' : 'no',
            observation: recomposition?.observation || '',
        }),
        [recomposition]
    );

    const handleSubmit = async (values, { setSubmitting }) => {
        const normalizedValues = {
            ...values,
            meetRequirements: values.meetRequirements === 'yes',
        };

        try {
            await onSave(recomposition?.id, normalizedValues);
            Swal.fire('Éxito', 'La recomposición fue guardada correctamente.', 'success');
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar la recomposición.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {recomposition ? 'Editar Recomposición de Jurado' : 'Crear Recomposición de Jurado'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                <div className="flex gap-4">
                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="meetRequirements"
                                                            value="yes"
                                                            className="form-radio"
                                                            onChange={() => setFieldValue('meetRequirements', 'yes')}
                                                        />
                                                        Sí
                                                    </label>
                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="meetRequirements"
                                                            value="no"
                                                            className="form-radio"
                                                            onChange={() => setFieldValue('meetRequirements', 'no')}
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                                <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="observation">Observación</label>
                                                <Field
                                                    name="observation"
                                                    as="textarea"
                                                    id="observation"
                                                    placeholder="Ingrese observaciones"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="observation" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                    disabled={isSubmitting}
                                                >
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

export default RecompositionModal;
