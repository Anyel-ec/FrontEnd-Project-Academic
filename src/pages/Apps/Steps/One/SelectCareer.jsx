import React from 'react';
import { useSelector } from 'react-redux';  // Para acceder al estado global
import Select from 'react-select';
import { ErrorMessage } from 'formik';
import '../../styles/toggleSwitch.css';
import { HandleMode } from '../../styles/selectStyles';

const CareerSelect = ({ options, value, setFieldValue, filterStudentsByCareer, errors, submitCount }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');  // Obtener el tema desde Redux
    const styles = HandleMode(isDarkMode);  // Aplicar los estilos según el modo

    return (
        <div className={`flex-grow ${submitCount && errors.career ? 'has-error' : ''}`}>
            <label htmlFor="career" className="block mb-1">Carrera</label>
            <Select
                name="career"
                placeholder="Selecciona una carrera"
                styles={styles}
                options={options}
                onChange={(option) => {
                    setFieldValue('career', option);
                    setFieldValue('student', null);  // Resetear selección de estudiante
                    filterStudentsByCareer(option.value);  // Filtrar estudiantes según la carrera
                }}
                value={value}
            />
            <ErrorMessage name="career" component="div" className="text-danger mt-1" />
        </div>
    );
};

export default CareerSelect;
