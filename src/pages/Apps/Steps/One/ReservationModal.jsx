import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';
import titleReservationsService from '../../../../api/titleReservationsService';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import Swal from 'sweetalert2';

const ReservationModal = ({ isOpen, onClose, onSave, reservation, lineOptions }) => {
    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        title: Yup.string()
            .required('El título es obligatorio')
            .test('is-unique', 'El título ya existe. Por favor elige otro.', async function (value) {
                try {
                    // Llamar a una función para verificar si el título ya existe
                    const isDuplicate = await titleReservationsService.checkTitleExists(value);
    
                    if (isDuplicate) {
                        // Mostrar SweetAlert si el título ya existe
                        Swal.fire({
                            title: 'Error',
                            text: 'El título ya existe. Por favor elige otro.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
    
                        // Retornar false para que Yup lo considere inválido
                        return false;
                    }
    
                    // Retornar true si no es duplicado
                    return true;
                } catch (error) {
                    // Retornar false si hubo un error
                    return false;
                }
            }),
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
                                    onSubmit={(values) => {
                                        if (reservation && reservation.id) {
                                            onSave(reservation.id, values); // Enviar los valores al guardar
                                        } else {
                                            console.error('Error: No se ha definido un ID válido para la reservación.');
                                        }
                                    }}
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
                                                <Field name="title" type="text" id="title" placeholder="Ingrese el título del proyecto" className="form-input" />
                                                <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                            </div>

                                            {/* Select para la línea de investigación */}
                                            <div className="">
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
