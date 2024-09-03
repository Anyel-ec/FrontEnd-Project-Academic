import { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Select from 'react-select';
import { Formik, Form, ErrorMessage } from 'formik';
import studentService from '../../../api/studentService';
import careerService from '../../../api/careerService';

const StudentCareer = () => {
    const dispatch = useDispatch();
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [editingAssignment, setEditingAssignment] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Asignación de estudiantes a carreras'));
        fetchCareers();
        fetchStudents();
    }, [dispatch]);

    const fetchCareers = async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({ value: career.id, label: career.name, data: career }));
            setCareerOptions(options);
        } catch (error) {
            console.error('Error fetching careers', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const students = await studentService.getStudents();
            const options = students.map((student) => ({ value: student.id, label: `${student.firstName} ${student.lastName}`, data: student }));
            setStudentOptions(options);
        } catch (error) {
            console.error('Error fetching students', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingAssignment) {
                // Update existing assignment
                await studentService.updateAssignment(editingAssignment.id, {
                    studentId: values.student.value,
                    careerId: values.career.value,
                });
            } else {
                // Create new assignment
                await studentService.createAssignment({
                    studentId: values.student.value,
                    careerId: values.career.value,
                });
            }
            // Reset form and editing state
            setEditingAssignment(null);
            // Optionally, refetch data to refresh UI
        } catch (error) {
            console.error('Error saving assignment', error);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    career: editingAssignment ? { value: editingAssignment.career.id, label: editingAssignment.career.name } : null,
                    student: editingAssignment ? { value: editingAssignment.student.id, label: `${editingAssignment.student.firstName} ${editingAssignment.student.lastName}` } : null,
                }}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, handleSubmit }) => (
                    <Form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <Select
                                name="career"
                                placeholder="Selecciona una carrera"
                                options={careerOptions}
                                onChange={(option) => setFieldValue('career', option)}
                                value={values.career}
                            />
                            <ErrorMessage name="career" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-5">
                            <Select
                                name="student"
                                placeholder="Selecciona un estudiante"
                                options={studentOptions}
                                onChange={(option) => setFieldValue('student', option)}
                                value={values.student}
                            />
                            <ErrorMessage name="student" component="div" className="text-danger mt-1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar Asignación</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default StudentCareer;