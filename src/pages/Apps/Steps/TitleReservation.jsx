import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import careerService from '../../../api/careerService';
import { setPageTitle } from '../../../store/themeConfigSlice';
import 'flatpickr/dist/flatpickr.css';
import Select from 'react-select';
import { Formik, Form, ErrorMessage } from 'formik';
import studentService from "../../../api/studentService";
import { HandleMode } from '../styles/selectStyles';
import * as Yup from 'yup';
import '../styles/toggleSwitch.css'; // Importar los estilos del toggle

const validationSchema = Yup.object().shape({
    career: Yup.object().nullable().required('Debes seleccionar una carrera'),
    student: Yup.object().nullable().required('Debes seleccionar un estudiante'),
});

const isDarkMode = false; // Aquí puedes ajustar la lógica para determinar el modo
const styles = HandleMode(isDarkMode); // Llamamos a la función con el valor de isDarkMode

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [careerOptions, setCareerOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [filteredStudentOptions, setFilteredStudentOptions] = useState([]);
    const [apiError, setApiError] = useState(null); // Estado para el error
    const [isStudentSelectEnabled, setIsStudentSelectEnabled] = useState(false); // Estado del toggle

    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título')); // Establece el título de la página
        fetchCareers();
        fetchStudents(); // Llamar a la API de estudiantes solo una vez
    }, [dispatch]);

    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
            setApiError(null); // Limpiar error si la llamada fue exitosa
        } catch (error) {
            console.error('Error fetching careers:', error);
            setApiError('Error al cargar las carreras, inténtelo de nuevo más tarde.');
        }
    }, []);

    const fetchStudents = useCallback(async () => {
        try {
            const students = await studentService.getStudents(); // Llamada al servicio de estudiantes
            const options = students.map((student) => ({
                value: `${student.id}`,
                label: `${student.studentCode} - ${student.firstNames} ${student.lastName}`, // Ajuste basado en los campos disponibles
                careerId: student.career ? student.career.id : null, // Verificación de que career existe
                data: student,
            }));
            setStudentOptions(options);
            setApiError(null); // Limpiar error si la llamada fue exitosa
        } catch (error) {
            console.error('Error fetching students:', error);
            setApiError('Error al cargar los estudiantes, inténtelo de nuevo más tarde.');
        }
    }, []);

    // Filtrar estudiantes cuando se selecciona una carrera
    const filterStudentsByCareer = (careerId) => {
        const filtered = studentOptions.filter(student => student.careerId === careerId);
        setFilteredStudentOptions(filtered);
    };

    // Manejar el cambio del toggle
    const handleToggleChange = () => {
        setIsStudentSelectEnabled(!isStudentSelectEnabled); // Cambia el estado del toggle
    };

    return (
      <div className="p-5">
      <Formik
          initialValues={{
              career: null,
              student: null,
          }}
          validationSchema={validationSchema} 
          enableReinitialize={true}
          onSubmit={(values) => {
              console.log('Formulario enviado con los valores: ', values);
              // Aquí iría la lógica para enviar los datos
          }}
      >
          {({ errors, submitCount, values, setFieldValue }) => (
              <Form className="flex flex-row items-center gap-4">
                  {/* Selector de carrera */}
                  <div className={`flex-grow ${submitCount && errors.career ? 'has-error' : ''}`}>
                      <label htmlFor="career" className="block mb-1">Carrera</label>
                      <Select
                          name="career"
                          styles={styles}
                          placeholder="Selecciona una carrera"
                          options={careerOptions}
                          onChange={(option) => {
                              setFieldValue('career', option);
                              setFieldValue('student', null); // Limpiar selección de estudiantes al cambiar de carrera
                              filterStudentsByCareer(option.value); // Filtrar estudiantes
                          }}
                          value={values.career}
                      />
                      <ErrorMessage name="career" component="div" className="text-danger mt-1" />
                  </div>
  
                  {/* Selector de estudiante */}
                  <div className={`flex-grow ${submitCount && errors.student ? 'has-error' : ''}`}>
                      <label htmlFor="student" className="block mb-1">Estudiante</label>
                      <Select
                          name="student"
                          styles={styles}
                          placeholder="Selecciona un estudiante"
                          options={filteredStudentOptions} // Mostrar solo los estudiantes filtrados
                          onChange={(option) => setFieldValue('student', option)}
                          value={values.student}
                          isDisabled={!values.career || !isStudentSelectEnabled} // Deshabilitar si no hay carrera o si el toggle está apagado
                      />
                      <ErrorMessage name="student" component="div" className="text-danger mt-1" />
                  </div>
  
                  {/* Toggle Habilitar estudiantes */}
                  <div className="flex items-center flex-col ">
                      <label htmlFor="toggleStudentSelect" className="">
                          Habilitar estudiantes
                      </label>
                      <label className="switch">
                          <input
                              type="checkbox"
                              id="toggleStudentSelect"
                              checked={isStudentSelectEnabled}
                              onChange={handleToggleChange}
                          />
                          <span className="slider round"></span>
                      </label>
                  </div>
  
                  {/* Botón Guardar */}
                  <div className="flex justify-items-end">
                      <button 
                          type="submit"
                          className="bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded hover:bg-blue-700"
                      >
                          Guardar
                      </button>
                  </div>
              </Form>
          )}
      </Formik>
      {apiError && <div className="text-danger">{apiError}</div>}
  </div>
  
    );
};

export default TitleReservation;