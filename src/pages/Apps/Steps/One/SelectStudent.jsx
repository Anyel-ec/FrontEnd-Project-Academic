import React from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';  // Para acceder al estado global
import { ErrorMessage } from 'formik';
import { HandleMode } from '../../styles/selectStyles';

const SelectStudent = ({ options, value, setFieldValue, isDisabled, errors, submitCount }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');  // Verifica si el tema es oscuro
    const styles = HandleMode(isDarkMode);  // Aplicar los estilos según el modo
    return (
    <div className={`flex-grow ${submitCount && errors.student ? 'has-error' : ''}`}>
      <label htmlFor="student" className="block mb-1">Estudiante</label>
      <Select
        name="student"
        styles={styles}
        placeholder="Selecciona un estudiante"
        options={options}
        onChange={(option) => setFieldValue('student', option)}
        value={value}
        isDisabled={isDisabled}
        noOptionsMessage={() => 'No hay estudiantes disponibles'}
      />
      <ErrorMessage name="student" component="div" className="text-danger mt-1" />
    </div>
  );
};

// Aquí es donde agregas React.memo
export default React.memo(SelectStudent, (prevProps, nextProps) => {
  // Solo re-renderiza si cambian las opciones, el valor o si está deshabilitado
  return (
    prevProps.options === nextProps.options &&
    prevProps.value === nextProps.value &&
    prevProps.isDisabled === nextProps.isDisabled
  );
});
