import { Formik, Form } from 'formik';
import SelectCareer from './SelectCareer';
import SelectStudent from './SelectStudent';
import ToggleSwitch from './ToggleSwitch';

const TitleReservationForm = ({ careerOptions, studentOptions, filteredStudentOptions, handleSubmit }) => {
    return (
        <Formik
            initialValues={{
                career: null,
                student: null
            }}
            onSubmit={handleSubmit}
            // Asumimos que validationSchema y otros setups vienen de fuera
        >
            {formikProps => (
                <Form className="flex flex-col gap-4">
                    <SelectCareer careerOptions={careerOptions} />
                    <SelectStudent studentOptions={filteredStudentOptions} />
                    <ToggleSwitch />
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Guardar</button>
                </Form>
            )}
        </Formik>
    );
};

export default TitleReservationForm;
