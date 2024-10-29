import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import IconX from '../../../../components/Icon/IconX';

const ApprovalModal = ({ isOpen, onClose, onSave, project, adviserOptions }) => {
    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        title: Yup.string(),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string(),
    });
    console.log(adviserOptions);

    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    const initialValues = {
        studentCode: project?.titleReservationStepOne.student?.studentCode || 'N/A',
        studentTwoCode: project?.titleReservationStepOne.studentTwo?.studentCode || '',
        studentFirstNames: project?.titleReservationStepOne.student?.firstNames || 'N/A',
        studentTwoFirstNames: project?.titleReservationStepOne.studentTwo?.firstNames || '',
        meetRequirements: project?.titleReservationStepOne.meetsRequirements ? 'yes' : 'no',
        observation: project?.observations || '',
        title: project?.title || '',
        projectSimilarity: project?.titleReservationStepOne?.projectSimilarity || 0,
        adviser: null, // Campo para el asesor seleccionado
    };

   const handleSubmit = async (values, { setSubmitting }) => {
        try {
            onSave(project.id, values);
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
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Editar Proyecto</div>
                            <div className="p-5">
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                                    {({ errors, submitCount, setFieldValue, values }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {console.log('Valor de projectSimilarity en Formik:', values.projectSimilarity)}
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly placeholder="Ingrese el código del estudiante" maxLength={6} className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>


                                            {project.titleReservationStepOne.studentTwo && (
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

                                            {/* Campo para el título del proyecto */}
                                            {/* <div className={submitCount && errors.title ? 'has-error' : ''}>
                                                <label htmlFor="title">Título del Proyecto</label>
                                                <Field
                                                    name="title"
                                                    type="text"
                                                    id="title"
                                                    placeholder="No existente"
                                                    className="form-input"
                                                    readOnly    
                                                />
                                                <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                            </div> */}

                                            {/* Select para la línea de investigación */}
       
                                            <div className="col-span-1">
                                                <label htmlFor="adviser">Seleccionar Asesor</label>
                                                <Select
                                                    id="adviser"
                                                    styles={styles}
                                                    options={adviserOptions
                                                        .filter((adviser) => adviser.id && adviser.firstNames && adviser.lastName) // Filtra datos completos
                                                        .map((adviser) => ({
                                                            value: adviser.id,
                                                            label: `${adviser.firstNames} ${adviser.lastName}`,
                                                        }))}
                                                    onChange={(option) => {
                                                        setFieldValue('adviser', option);
                                                    }}
                                                    placeholder="Seleccione un asesor..."
                                                />
                                            </div> 
                                            {/* Campo para la similitud del proyecto */}
                                            {/* <div className="col-span-1">
                                                <label htmlFor="projectSimilarity">Similitud del proyecto</label>
                                                <Field
                                                    name="projectSimilarity"
                                                    type="number"
                                                    id="projectSimilarity"
                                                    placeholder="Ingrese valores decimales.."
                                                    className="form-input"
                                                    onChange={(e) => setFieldValue('projectSimilarity', parseFloat(e.target.value) || '')}
                                                />
                                                <ErrorMessage name="projectSimilarity" component="div" className="text-danger mt-1" />
                                            </div> */}


                                            <div className={submitCount && errors.meetRequirements ? 'has-error' : ''}>
                                                <label htmlFor="meetRequirements">Proyecto Aprobado</label>
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

export default ApprovalModal;
