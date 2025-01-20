import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import titleReservationsService from '../../../../api/titleReservationsService';

const ReservationModal = ({ isOpen, onClose, onSave, reservation, lineOptions }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    useEffect(() => {
        if (isOpen && reservation?.id) {
            titleReservationsService.viewPdf(reservation.id)
                .then((pdfData) => {
                    setPdfAvailable(!!pdfData);
                })
                .catch((error) => {
                    console.error('Error al cargar el PDF:', error);
                    setPdfAvailable(false);
                });
        } else {
            setPdfAvailable(null);
        }
    }, [isOpen, reservation]);

    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        title: Yup.string().required('El título es obligatorio'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string(),
        registrationNumber: Yup.string().required('El reg es obligatorio'),
        commemorativeText: Yup.string().required('El nombre del año es obligatorio'),
    });

    const initialValues = {
        studentCode: reservation?.student?.studentCode || 'N/A',
        studentTwoCode: reservation?.studentTwo?.studentCode || '',
        meetRequirements: reservation?.meetsRequirements ? 'yes' : 'no',
        observation: reservation?.observations || '',
        title: reservation?.title || '',
        lineOfResearch: lineOptions.find((option) => option.value === reservation?.lineOfResearch?.id) || null,
        projectSimilarity: reservation?.projectSimilarity || 0,
        registrationNumber: reservation?.registrationNumber || '',
        commemorativeText: reservation?.commemorativeText || '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        await onSave(reservation.id, values);
        setSubmitting(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3">Aceptar Reservación</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, submitCount, errors, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field
                                                    name="studentCode"
                                                    type="text"
                                                    id="studentCode"
                                                    readOnly
                                                    placeholder="Ingrese el código del estudiante"
                                                    maxLength={6}
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>
                                            {reservation?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field
                                                        name="studentTwoCode"
                                                        type="text"
                                                        id="studentTwoCode"
                                                        placeholder="Ingrese el código del segundo estudiante"
                                                        maxLength={6}
                                                        readOnly
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="relative">
                                                <label htmlFor="title">Título del Proyecto</label>
                                                <Field
                                                    name="title"
                                                    type="text"
                                                    id="title"
                                                    placeholder="Ingrese el título del proyecto"
                                                    className="form-input"
                                                    onChange={(e) => {
                                                        const query = e.target.value;
                                                        setFieldValue('title', query);
                                                    }}
                                                />
                                                <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="lineOfResearch">Línea de Investigación</label>
                                                <Select
                                                    id="lineOfResearch"
                                                    styles={styles}
                                                    options={lineOptions}
                                                    value={values.lineOfResearch}
                                                    onChange={(option) => {
                                                        setFieldValue('lineOfResearch', option);
                                                    }}
                                                    placeholder="Seleccione una línea..."
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="projectSimilarity">Similitud del proyecto</label>
                                                <Field
                                                    name="projectSimilarity"
                                                    type="number"
                                                    min="0"
                                                    max="25"
                                                    id="projectSimilarity"
                                                    placeholder="Ingrese valores decimales.."
                                                    className="form-input"
                                                    onChange={(e) => setFieldValue('projectSimilarity', parseFloat(e.target.value) || '')}
                                                />
                                                <ErrorMessage name="projectSimilarity" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="registrationNumber">Reg</label>
                                                <Field
                                                    name="registrationNumber"
                                                    type="text"
                                                    id="registrationNumber"
                                                    placeholder="Ingrese el número de registro"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="registrationNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                <div className="flex gap-4">
                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="meetRequirements"
                                                            value="yes"
                                                            className="form-radio"
                                                            onChange={() => {
                                                                setFieldValue('meetRequirements', 'yes');
                                                                setFieldValue('observation', '');
                                                            }}
                                                        />
                                                        Sí
                                                    </label>
                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="meetRequirements"
                                                            value="no"
                                                            className="form-radio"
                                                            onChange={() => {
                                                                setFieldValue('meetRequirements', 'no');
                                                            }}
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                                <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="observation">Observaciones</label>
                                                <Field
                                                    name="observation"
                                                    as="textarea"
                                                    id="observation"
                                                    placeholder="Ingrese observaciones"
                                                    className="form-input"
                                                    disabled={values.meetRequirements === 'yes'}
                                                    style={{
                                                        cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                        opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                    }}
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
                                                    disabled={!pdfAvailable || isSubmitting}
                                                >
                                                    {pdfAvailable === null
                                                        ? 'Cargando...'
                                                        : pdfAvailable
                                                            ? 'Actualizar'
                                                            : 'No disponible'}
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
}
export default ReservationModal;
