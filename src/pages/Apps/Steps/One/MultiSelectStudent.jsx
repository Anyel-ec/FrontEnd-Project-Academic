import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';  // Para acceder al estado global
import { ErrorMessage } from 'formik';
import { HandleMode } from '../../styles/selectStyles';

const MultiSelectStudent = ({ options, value, setFieldValue, isDisabled, errors, submitCount, maxSelectable = 2 }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = useSelector((state) => state.themeConfig.theme);  // 'light' | 'dark' | 'system'
    
    useEffect(() => {
        // Función para aplicar el modo correcto según las preferencias del sistema
        const applySystemTheme = () => {
            if (theme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDarkMode(prefersDark);
            } else {
                setIsDarkMode(theme === 'dark');
            }
        };

        // Aplicar el tema inicial al cargar el componente
        applySystemTheme();

        // Escuchar cambios en las preferencias del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applySystemTheme);

        // Limpieza del listener al desmontar el componente
        return () => mediaQuery.removeEventListener('change', applySystemTheme);
    }, [theme]);  // Ejecuta el efecto cuando cambia el tema

    const styles = HandleMode(isDarkMode);  // Usa el estado de `isDarkMode` para obtener los estilos correctos

    const handleChange = (selectedOptions) => {
        if (selectedOptions.length > maxSelectable) return;

        if (selectedOptions.length > 1) {
            const careerIdFirstStudent = selectedOptions[0].careerId;
            const hasDifferentCareer = selectedOptions.some(student => student.careerId !== careerIdFirstStudent);

            if (hasDifferentCareer) {
                Swal.fire('Error', 'No se pueden seleccionar estudiantes de diferentes carreras', 'error');
                return;
            }
        }

        setFieldValue('students', selectedOptions);
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
                isMulti  
                noOptionsMessage={() => 'No hay estudiantes disponibles'}
                closeMenuOnSelect={false}
            />
            <ErrorMessage name="students" component="div" className="text-danger mt-1" />
        </div>
    );
};

export default React.memo(MultiSelectStudent, (prevProps, nextProps) => {
    return (
        prevProps.options === nextProps.options &&
        prevProps.value === nextProps.value &&
        prevProps.isDisabled === nextProps.isDisabled &&
        JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value)  
    );
});
