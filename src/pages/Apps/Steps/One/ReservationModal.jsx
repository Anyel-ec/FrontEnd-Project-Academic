import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import IconX from '../../../../components/Icon/IconX';

const ReservationModal = ({ isOpen, onClose, onSave, reservation, lineOptions }) => {

    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        title: Yup.string().required('El título es obligatorio'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string(),
    });

    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    const initialValues = {
        studentCode: reservation?.student?.studentCode || 'N/A',
        studentTwoCode: reservation?.studentTwo?.studentCode || '',
        meetRequirements: reservation?.meetsRequirements ? 'yes' : 'no',
        observation: reservation?.observations || '',
        title: reservation?.title || '', // Inicializa el título si existe
        lineOfResearch: lineOptions.find((option) => option.value === reservation?.lineOfResearch?.id) || null,
        projectSimilarity: reservation?.projectSimilarity || null,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Guardar los cambios directamente sin validación de duplicados
            onSave(reservation.id, values); 
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al guardar los datos: ' + error.message, 'error');
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
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Aceptar Reservación</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}  // Manejar la lógica de envío
                                >
                                    {({ errors, submitCount, setFieldValue, values }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" />
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

                                            {/* Campo para el título */}
                                            <div className={submitCount && errors.title ? 'has-error' : ''}>
                                                <label htmlFor="title">Título del Proyecto</label>
                                                <Field
                                                    name="title"
                                                    type="text"
                                                    id="title"
                                                    placeholder="Ingrese el título del proyecto"
                                                    className="form-input"
                                                    // Monitorea si el usuario modifica el campo de título
                                                    onChange={(e) => {
                                                        setFieldValue('title', e.target.value);
                                                    }}
                                                />
                                                <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                            </div>

                                            {/* Select para la línea de investigación */}
                                            <div className="col-span-1">
                                                <label htmlFor="lineOfResearch">Línea de Investigación</label>
                                                <Select
                                                    className=""
                                                    styles={styles}
                                                    options={lineOptions}
                                                    value={values.lineOfResearch}
                                                    onChange={(option) => setFieldValue('lineOfResearch', option)}
                                                    placeholder="Seleccione una línea..."
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="projectSimilarity">Simlitud del proyecto</label>
                                                <Field name="projectSimilarity" type="text" id="projectSimilarity" placeholder="Ingrese valores decimales.." className="form-input" />
                                                <ErrorMessage name="projectSimilarity" component="div" className="text-danger mt-1" />
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
                                                    Actualizar
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
