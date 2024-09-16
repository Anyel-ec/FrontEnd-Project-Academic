import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SelectCareer from './SelectCareer';
import SelectStudent from './SelectStudent';

const validationSchema = Yup.object().shape({
    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
    student: Yup.object().nullable().required('Debes seleccionar un estudiante'),
});

const ReservationModal = ({ isOpen, onClose, careerOptions, filteredStudentOptions, addTitleReservation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Agregar Reservación</p>
                        <div className="modal-close cursor-pointer z-50" onClick={onClose}>
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M14.53 3.53l-1.06-1.06L9 6.94 4.53 2.47 3.47 3.53 7.94 9l-4.47 4.47 1.06 1.06L9 11.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </div>
                    </div>

                    <Formik
                        initialValues={{ career: null, student: null }}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            const studentId = values.student?.value;
                            if (studentId) {
                                setIsSubmitting(true);
                                addTitleReservation(studentId)
                                    .then(() => {
                                        resetForm();
                                        setIsSubmitting(false);
                                        onClose();  // Cierra el modal después de agregar
                                    })
                                    .catch(() => setIsSubmitting(false));
                            } else {
                                setIsSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, submitCount, values, setFieldValue }) => (
                            <Form className="flex flex-col gap-4">
                                <SelectCareer
                                    options={careerOptions}
                                    value={values.career}
                                    setFieldValue={setFieldValue}
                                    filterStudentsByCareer={(careerId) => {
                                        // Aquí filtramos los estudiantes por carrera seleccionada
                                        if (!careerId) {
                                            setFieldValue('student', null);
                                        }
                                    }}
                                    errors={errors}
                                    submitCount={submitCount}
                                />
                                <SelectStudent
                                    options={filteredStudentOptions}
                                    value={values.student}
                                    setFieldValue={setFieldValue}
                                    isDisabled={!values.career}
                                    errors={errors}
                                    submitCount={submitCount}
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary mr-2"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
