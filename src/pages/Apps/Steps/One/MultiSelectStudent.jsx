import React from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';  // Para acceder al estado global
import { ErrorMessage } from 'formik';
import { HandleMode } from '../../styles/selectStyles';

const MultiSelectStudent = ({ options, value, setFieldValue, isDisabled, errors, submitCount, maxSelectable = 2 }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');  // Verifica si el tema es oscuro
    const styles = HandleMode(isDarkMode);  // Aplicar los estilos según el modo

    const handleChange = (selectedOptions) => {
        // Limitar la cantidad de estudiantes seleccionados al máximo permitido
        if (selectedOptions.length <= maxSelectable) {
            setFieldValue('students', selectedOptions);  // Actualizamos el array de estudiantes
        }
    };

    return (
        <div className={`flex-grow ${submitCount && errors.students ? 'has-error' : ''}`}>
            <label htmlFor="students" className="block mb-1">Estudiantes</label>
            <Select
                name="students"
                styles={styles}
                placeholder="Selecciona hasta dos estudiantes"
                options={options}
                onChange={handleChange}
                value={value}
                isDisabled={isDisabled}
                isMulti  // Habilita la selección múltiple
                noOptionsMessage={() => 'No hay estudiantes disponibles'}
                closeMenuOnSelect={false} // Permite seguir seleccionando hasta el máximo permitido
            />
            <ErrorMessage name="students" component="div" className="text-danger mt-1" />
        </div>
    );
};

// Aquí es donde agregas React.memo para mejorar el rendimiento
export default React.memo(MultiSelectStudent, (prevProps, nextProps) => {
    return (
      prevProps.options === nextProps.options &&
      prevProps.value === nextProps.value &&
      prevProps.isDisabled === nextProps.isDisabled &&
      JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value)  // Verificar también el valor actual de los estudiantes seleccionados
    );
  });
  
