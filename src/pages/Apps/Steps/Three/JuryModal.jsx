import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import IconLoader from '../../../../components/Icon/IconLoader';
import IconX from '../../../../components/Icon/IconX';

const JuryModal = ({ isOpen, onClose, onSave, juryAppointment, adviserOptions, isLoading }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);
    console.log(juryAppointment);
    const initialValues = React.useMemo(
        () => ({
            studentCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observations: juryAppointment?.observations || '',
            meetRequirements: juryAppointment?.meetRequirements ? 'yes' : 'no',
            president: juryAppointment?.president
                ? {
                      value: juryAppointment.president.id,
                      label: `${juryAppointment.president.firstNames} ${juryAppointment.president.lastName}`,
                  }
                : null,
            firstMember: juryAppointment?.firstMember
                ? {
                      value: juryAppointment.firstMember.id,
                      label: `${juryAppointment.firstMember.firstNames} ${juryAppointment.firstMember.lastName}`,
                  }
                : null,
            secondMember: juryAppointment?.secondMember
                ? {
                      value: juryAppointment.secondMember.id,
                      label: `${juryAppointment.secondMember.firstNames} ${juryAppointment.secondMember.lastName}`,
                  }
                : null,
            accessory: juryAppointment?.accessory
                ? {
                      value: juryAppointment.accessory.id,
                      label: `${juryAppointment.accessory.firstNames} ${juryAppointment.accessory.lastName}`,
                  }
                : null,

            adviser: juryAppointment?.projectApprovalStepTwo?.adviser
                ? {
                      value: juryAppointment?.projectApprovalStepTwo?.adviser.id,
                      label: `${juryAppointment?.projectApprovalStepTwo?.adviser.firstNames} ${juryAppointment?.projectApprovalStepTwo?.adviser.lastName}`,
                  }
                : null,
            coadviser: juryAppointment?.projectApprovalStepTwo?.coadviser
                ? {
                      value: juryAppointment?.projectApprovalStepTwo?.coadviser.id,
                      label: `${juryAppointment?.projectApprovalStepTwo?.coadviser.firstNames} ${juryAppointment?.projectApprovalStepTwo?.coadviser.lastName}`,
                  }
                : null,
        }),
        [juryAppointment]
    );

    const filterOptions = (selectedValues, currentFieldValue) => {
        // Obtener los IDs de todos los valores seleccionados excepto el del campo actual
        const selectedIds = selectedValues.filter((val) => val && val.value !== currentFieldValue?.value).map((val) => val.value);

        // Filtrar las opciones para excluir a los ya seleccionados en cualquier otro Select
        return adviserOptions
            .filter((adviser) => !selectedIds.includes(adviser.id))
            .map((adviser) => ({
                value: adviser.id,
                label: `${adviser.firstNames} ${adviser.lastName}`,
            }));
    };

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
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Crear Jurados</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            president: values.president ? { id: values.president.value } : null,
                                            firstMember: values.firstMember ? { id: values.firstMember.value } : null,
                                            secondMember: values.secondMember ? { id: values.secondMember.value } : null,
                                            accessory: values.accessory ? { id: values.accessory.value } : null,
                                            meetRequirements: values.meetRequirements === 'yes' ? true : false,
                                            observations: values.observations || '',
                                        };
                                        console.log(values.meetRequirements);
                                        console.log('Llamando a onSave con:', transformedValues);
                                        onSave(transformedValues, juryAppointment?.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values }) => {
                                        const selectedValues = [values.president, values.firstMember, values.secondMember, values.accessory, values.adviser, values.coadviser];

                                        return (
                                            <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="col-span-1">
                                                    <label htmlFor="president">Seleccionar Presidente</label>
                                                    <Select
                                                        id="president"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.president)}
                                                        value={values.president}
                                                        onChange={(option) => setFieldValue('president', option)}
                                                        placeholder="Seleccione un presidente..."
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="firstMember">Seleccionar Primer Miembro</label>
                                                    <Select
                                                        id="firstMember"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.firstMember)}
                                                        value={values.firstMember}
                                                        onChange={(option) => setFieldValue('firstMember', option)}
                                                        placeholder="Seleccione un primer miembro..."
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="secondMember">Seleccionar Segundo Miembro</label>
                                                    <Select
                                                        id="secondMember"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.secondMember)}
                                                        value={values.secondMember}
                                                        onChange={(option) => setFieldValue('secondMember', option)}
                                                        placeholder="Seleccione un segundo miembro..."
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="accessory">Seleccionar Accesitario</label>
                                                    <Select
                                                        id="accessory"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.accessory)}
                                                        value={values.accessory}
                                                        onChange={(option) => setFieldValue('accessory', option)}
                                                        placeholder="Seleccione un accesitario..."
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="adviser">Asesor</label>
                                                    <Select id="adviser" styles={styles} value={values.adviser} isDisabled placeholder="Asesor seleccionado" />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="coadviser">Coasesor</label>
                                                    <Select id="coadviser" styles={styles} value={values.coadviser} isDisabled placeholder="Coasesor seleccionado" />
                                                </div>
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
                                                </div>

                                                <div className="col-span-2">
                                                    <label htmlFor="observations">Observaciones</label>
                                                    <Field name="observations" as="textarea" id="observations" placeholder="Ingrese observaciones" className="form-input" />
                                                    <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                                </div>

                                                <div className="flex justify-end items-center mt-8 col-span-2">
                                                    <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                        Cancelar
                                                    </button>
                                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoading}>
                                                        {isLoading ? (
                                                            <span className="flex items-center">
                                                                Guardando
                                                                <IconLoader className="animate-[spin_2s_linear_infinite] inline-block ml-2" />
                                                            </span>
                                                        ) : (
                                                            'Guardar'
                                                        )}
                                                    </button>
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default JuryModal;
